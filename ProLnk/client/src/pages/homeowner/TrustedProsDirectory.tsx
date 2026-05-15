import { useState } from "react";
import { Link } from "wouter";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Search, Star, Shield, Clock, MapPin, CheckCircle,
  ChevronRight, Heart, MessageSquare, Zap, Phone,
  Calendar, Award, TrendingUp,
} from "lucide-react";

const TRADES = ["All", "HVAC", "Plumbing", "Roofing", "Electrical", "Foundation", "Pest Control", "Landscaping", "Handyman"];

const PROS = [
  {
    id: 1, name: "Mike Torres", trade: "HVAC", rating: 4.9, jobs: 3,
    response: "< 5 min", lastJob: "Apr 28, 2026", status: "available",
    priceRange: "$120–$350", avatar: "MT", color: "#14B8A6",
    badge: "Most Reliable", featured: true,
  },
  {
    id: 2, name: "CoolAir Solutions", trade: "HVAC", rating: 4.8, jobs: 5,
    response: "12 min", lastJob: "Mar 15, 2026", status: "busy",
    priceRange: "$85–$280", avatar: "CS", color: "#3B82F6",
    badge: "Best Value", featured: true,
  },
  {
    id: 3, name: "Flow Masters Plumbing", trade: "Plumbing", rating: 4.8, jobs: 2,
    response: "8 min", lastJob: "May 1, 2026", status: "available",
    priceRange: "$95–$420", avatar: "FM", color: "#8B5CF6",
    badge: "Fastest Response", featured: true,
  },
  {
    id: 4, name: "Apex Roofing Co.", trade: "Roofing", rating: 4.7, jobs: 1,
    response: "30 min", lastJob: "Feb 10, 2026", status: "seasonal",
    priceRange: "$800–$12,000", avatar: "AR", color: "#F97316",
    badge: null, featured: false,
  },
  {
    id: 5, name: "Bright Electric", trade: "Electrical", rating: 4.9, jobs: 4,
    response: "< 10 min", lastJob: "May 8, 2026", status: "available",
    priceRange: "$150–$600", avatar: "BE", color: "#EAB308",
    badge: null, featured: false,
  },
  {
    id: 6, name: "GreenScape Pro", trade: "Landscaping", rating: 4.6, jobs: 2,
    response: "45 min", lastJob: "Apr 5, 2026", status: "available",
    priceRange: "$200–$1,500", avatar: "GP", color: "#10B981",
    badge: null, featured: false,
  },
  {
    id: 7, name: "SecureBase Foundation", trade: "Foundation", rating: 4.8, jobs: 1,
    response: "2 hrs", lastJob: "Jan 20, 2026", status: "busy",
    priceRange: "$1,200–$8,000", avatar: "SB", color: "#EC4899",
    badge: null, featured: false,
  },
  {
    id: 8, name: "HandyPro Dallas", trade: "Handyman", rating: 4.7, jobs: 6,
    response: "20 min", lastJob: "May 12, 2026", status: "available",
    priceRange: "$75–$350", avatar: "HD", color: "#F59E0B",
    badge: null, featured: false,
  },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  available: { bg: "#05966920", color: "#10B981", label: "Available Now" },
  busy:      { bg: "#D9780620", color: "#F59E0B", label: "Usually Busy" },
  seasonal:  { bg: "#3B82F620", color: "#3B82F6", label: "Seasonal" },
};

const FIND_NEW_TRADES = ["HVAC", "Plumbing", "Roofing", "Electrical", "Foundation", "Pest Control"];

export default function TrustedProsDirectory() {
  const [search, setSearch] = useState("");
  const [tradeFilter, setTradeFilter] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([1, 3]);

  const filtered = PROS.filter((p) => {
    const matchTrade = tradeFilter === "All" || p.trade === tradeFilter;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.trade.toLowerCase().includes(search.toLowerCase());
    return matchTrade && matchSearch;
  });

  const featuredPros = PROS.filter((p) => p.featured);

  const toggleFav = (id: number) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  return (
    <HomeownerLayout>
      <div
        style={{
          minHeight: "100vh",
          background: "#0A1628",
          color: "#F0F2FF",
          fontFamily: "'Inter', system-ui, sans-serif",
          padding: "28px 20px 80px",
          maxWidth: 980,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px" }}>Your Pro Directory</h1>
          <p style={{ color: "#8B91A8", margin: 0, fontSize: 15 }}>
            Your vetted team for every home need
          </p>
        </div>

        {/* Featured Pros */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 14px", color: "#8B91A8", textTransform: "uppercase", letterSpacing: 1 }}>
            Your Top Pros
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {featuredPros.map((pro) => (
              <div
                key={pro.id}
                style={{
                  background: "linear-gradient(135deg, #13192B, #0D1520)",
                  border: `1px solid ${pro.color}40`,
                  borderRadius: 14,
                  padding: "16px 18px",
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: pro.color + "33",
                    border: `2px solid ${pro.color}60`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: pro.color,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {pro.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#F0F2FF" }}>{pro.name}</p>
                    <Shield size={14} color="#14B8A6" />
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      background: pro.color + "22",
                      color: pro.color,
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 20,
                      marginTop: 3,
                    }}
                  >
                    {pro.badge}
                  </div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 4 }}>
                    <Star size={12} color="#FFB300" fill="#FFB300" />
                    <span style={{ fontSize: 12, color: "#F0F2FF", fontWeight: 600 }}>{pro.rating}</span>
                    <span style={{ fontSize: 12, color: "#8B91A8" }}>· {pro.jobs} jobs for you</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search + Filter */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search
              size={16}
              color="#8B91A8"
              style={{ position: "absolute", left: 12, pointerEvents: "none" }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pros by name or trade..."
              style={{
                width: "100%",
                padding: "10px 12px 10px 38px",
                background: "#13192B",
                border: "1px solid #1E2A40",
                borderRadius: 10,
                color: "#F0F2FF",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <select
            value={tradeFilter}
            onChange={(e) => setTradeFilter(e.target.value)}
            style={{
              padding: "10px 14px",
              background: "#13192B",
              border: "1px solid #1E2A40",
              borderRadius: 10,
              color: "#F0F2FF",
              fontSize: 14,
              outline: "none",
              cursor: "pointer",
            }}
          >
            {TRADES.map((t) => (
              <option key={t} value={t}>{t === "All" ? "All Trades" : t}</option>
            ))}
          </select>
        </div>

        {/* Trade Chips */}
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 8,
            marginBottom: 20,
            scrollbarWidth: "none",
          }}
        >
          {TRADES.map((t) => (
            <button
              key={t}
              onClick={() => setTradeFilter(t)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                whiteSpace: "nowrap",
                background: tradeFilter === t ? "#14B8A6" : "#13192B",
                color: tradeFilter === t ? "#fff" : "#8B91A8",
                border: tradeFilter === t ? "1px solid #14B8A6" : "1px solid #1E2A40",
                transition: "all 0.15s",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Pro Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
          {filtered.map((pro) => {
            const st = STATUS_STYLE[pro.status];
            const isFav = favorites.includes(pro.id);
            return (
              <div
                key={pro.id}
                style={{
                  background: "#13192B",
                  border: "1px solid #1E2A40",
                  borderRadius: 14,
                  padding: "16px 18px",
                }}
              >
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: pro.color + "33",
                      border: `2px solid ${pro.color}50`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      color: pro.color,
                      fontSize: 15,
                      flexShrink: 0,
                    }}
                  >
                    {pro.avatar}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{pro.name}</span>
                        <Shield size={13} color="#14B8A6" />
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          padding: "3px 10px",
                          borderRadius: 20,
                          background: st.bg,
                          color: st.color,
                          fontWeight: 600,
                        }}
                      >
                        {st.label}
                      </span>
                    </div>

                    {/* Trade badge + rating row */}
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 5, flexWrap: "wrap" }}>
                      <span
                        style={{
                          background: pro.color + "22",
                          color: pro.color,
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: 6,
                        }}
                      >
                        {pro.trade}
                      </span>
                      <Star size={12} color="#FFB300" fill="#FFB300" />
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{pro.rating}</span>
                      <span style={{ fontSize: 12, color: "#8B91A8" }}>·</span>
                      <span style={{ fontSize: 12, color: "#8B91A8" }}>{pro.jobs} jobs for you</span>
                    </div>

                    {/* Meta row */}
                    <div style={{ display: "flex", gap: 16, marginTop: 6, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <Clock size={12} color="#8B91A8" />
                        <span style={{ fontSize: 12, color: "#8B91A8" }}>{pro.response} response</span>
                      </div>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <Calendar size={12} color="#8B91A8" />
                        <span style={{ fontSize: 12, color: "#8B91A8" }}>Last job {pro.lastJob}</span>
                      </div>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <TrendingUp size={12} color="#8B91A8" />
                        <span style={{ fontSize: 12, color: "#8B91A8" }}>{pro.priceRange}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                      <button
                        style={{
                          padding: "7px 16px",
                          background: "#14B8A6",
                          border: "none",
                          borderRadius: 8,
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Book Again
                      </button>
                      <button
                        style={{
                          padding: "7px 14px",
                          background: "transparent",
                          border: "1px solid #2E3450",
                          borderRadius: 8,
                          color: "#8B91A8",
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <MessageSquare size={13} />
                        Message
                      </button>
                      <button
                        onClick={() => toggleFav(pro.id)}
                        style={{
                          padding: "7px 14px",
                          background: isFav ? "#EF444420" : "transparent",
                          border: isFav ? "1px solid #EF4444" : "1px solid #2E3450",
                          borderRadius: 8,
                          color: isFav ? "#EF4444" : "#8B91A8",
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          transition: "all 0.15s",
                        }}
                      >
                        <Heart size={13} fill={isFav ? "#EF4444" : "none"} />
                        {isFav ? "Saved" : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#8B91A8" }}>
              <Shield size={32} color="#2E3450" style={{ marginBottom: 12 }} />
              <p style={{ margin: 0 }}>No pros match your filters</p>
            </div>
          )}
        </div>

        {/* Find New Pro */}
        <div
          style={{
            background: "linear-gradient(135deg, #13192B, #0D1520)",
            border: "1px solid #2E3450",
            borderRadius: 16,
            padding: "24px 22px",
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#14B8A620",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Search size={18} color="#14B8A6" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Find a New Pro</h3>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#8B91A8" }}>
                Looking for a trade you haven't used before?
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {FIND_NEW_TRADES.map((trade) => (
              <Link key={trade} href="/trustypro/book">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "7px 14px",
                    background: "#0A1628",
                    border: "1px solid #2E3450",
                    borderRadius: 20,
                    fontSize: 13,
                    color: "#F0F2FF",
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "border-color 0.15s",
                  }}
                >
                  {trade}
                  <ChevronRight size={12} color="#14B8A6" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
