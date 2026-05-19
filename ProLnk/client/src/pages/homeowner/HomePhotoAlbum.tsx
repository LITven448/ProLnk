import { useState, useRef } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Camera, Upload, Image, FolderOpen, Sparkles, Share2,
  CheckCircle, Shield, ChevronRight, Copy,
} from "lucide-react";

const ALBUMS = [
  { title: "Foundation Work", count: 12, date: "May 2024″, color: "#F97316", emoji: "🏗️" },
  { title: "Roof Replacement", count: 24, date: "March 2023″, color: "#3B82F6", emoji: "🏠" },
  { title: "Kitchen Update", count: 18, date: "Jan 2025″, color: "#00E676", emoji: "🍳" },
  { title: "HVAC Install", count: 8, date: "Aug 2022″, color: "#00D4FF", emoji: "❄️" },
  { title: "Pest Treatment", count: 6, date: "Feb 2025″, color: "#A855F7", emoji: "🛡️" },
  { title: "Exterior Paint", count: 31, date: "Oct 2024″, color: "#FFB300", emoji: "🎨" },
];

const PHOTO_GRID = [
  { label: "Foundation Work", gradient: "linear-gradient(135deg, #F9731644, #F97316AA)" },
  { label: "Roof Replace", gradient: "linear-gradient(135deg, #3B82F644, #3B82F6AA)" },
  { label: "Kitchen", gradient: "linear-gradient(135deg, #00E67644, #00E676AA)" },
  { label: "HVAC Install", gradient: "linear-gradient(135deg, #00D4FF44, #00D4FFAA)" },
  { label: "Pest Treatment", gradient: "linear-gradient(135deg, #A855F744, #A855F7AA)" },
  { label: "Exterior Paint", gradient: "linear-gradient(135deg, #FFB30044, #FFB300AA)" },
  { label: "Foundation Work", gradient: "linear-gradient(135deg, #F9731622, #F97316AA)" },
  { label: "Deck Work", gradient: "linear-gradient(135deg, #10B98144, #10B981AA)" },
  { label: "Gutters", gradient: "linear-gradient(135deg, #EC489944, #EC4899AA)" },
  { label: "Landscaping", gradient: "linear-gradient(135deg, #84CC1644, #84CC16AA)" },
  { label: "Driveway", gradient: "linear-gradient(135deg, #64748B44, #64748BAA)" },
  { label: "Roof Replace", gradient: "linear-gradient(135deg, #3B82F622, #3B82F6AA)" },
];

const AI_FINDINGS = [
  { icon: CheckCircle, text: "Good drainage around foundation", color: "#00E676″ },
  { icon: CheckCircle, text: "No visible roof damage detected", color: "#00E676″ },
  { icon: CheckCircle, text: "Foundation appears stable", color: "#00E676″ },
  { icon: Shield, text: "Pest barriers intact", color: "#00D4FF" },
];

export default function HomePhotoAlbum() {
  const [dragOver, setDragOver] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleCopyLink() {
    navigator.clipboard.writeText("https://prolnk.io/home/share/abc123def456″).catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  return (
    <HomeownerLayout>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 0 40px" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#F0F2FF", margin: 0 }}>Home Photo Album</h1>
          <p style={{ color: "#8B91A8″, marginTop: 6, fontSize: 14 }}>Visual history of every improvement</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Total Photos", value: "127″, icon: Camera, color: "#00D4FF", grad: "linear-gradient(135deg, #00D4FF22, #00D4FF44)" },
            { label: "Projects Documented", value: "8″, icon: FolderOpen, color: "#00E676", grad: "linear-gradient(135deg, #00E67622, #00E67644)" },
            { label: "Storage Used", value: "2.1 GB", icon: Image, color: "#A855F7″, grad: "linear-gradient(135deg, #A855F722, #A855F744)" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#1A1E2A", border: "1px solid #252A3A", borderRadius: 12, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: s.grad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <s.icon size={20} color={s.color} />
              </div>
              <div>
                <p style={{ color: "#8B91A8″, fontSize: 12, margin: 0, marginBottom: 2 }}>{s.label}</p>
                <p style={{ color: "#F0F2FF", fontSize: 20, fontWeight: 700, margin: 0 }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Area */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? "#00D4FF" : "#252A3A"}`,
            borderRadius: 14,
            padding: "32px 20px",
            textAlign: "center",
            cursor: "pointer",
            background: dragOver ? "#00D4FF08″ : "#13161E",
            marginBottom: 28,
            transition: "all 0.2s",
          }}
        >
          <input ref={fileInputRef} type="file" multiple accept="image/*" style={{ display: "none" }} />
          <div style={{ width: 52, height: 52, borderRadius: 12, background: "#00D4FF22″, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <Upload size={22} color="#00D4FF" />
          </div>
          <p style={{ color: "#F0F2FF", fontSize: 15, fontWeight: 600, margin: 0, marginBottom: 4 }}>Upload photos</p>
          <p style={{ color: "#8B91A8″, fontSize: 13, margin: 0 }}>or tap to browse — JPG, PNG, HEIC supported</p>
        </div>

        {/* Albums */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <h2 style={{ color: "#F0F2FF", fontSize: 16, fontWeight: 600, margin: 0 }}>Albums</h2>
              <p style={{ color: "#8B91A8″, fontSize: 13, margin: "3px 0 0" }}>Organized by project</p>
            </div>
            <button style={{ background: "none", border: "none", color: "#00D4FF", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {ALBUMS.map((album) => (
              <div
                key={album.title}
                style={{ background: "#1A1E2A", border: "1px solid #252A3A", borderRadius: 12, padding: 16, cursor: "pointer", transition: "border-color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = album.color + "66″)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#252A3A")}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: album.color + "22″, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 10 }}>
                  {album.emoji}
                </div>
                <p style={{ color: "#F0F2FF", fontSize: 13, fontWeight: 600, margin: 0, marginBottom: 3 }}>{album.title}</p>
                <p style={{ color: "#8B91A8″, fontSize: 12, margin: 0 }}>{album.count} photos · {album.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Photos Grid */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ color: "#F0F2FF", fontSize: 16, fontWeight: 600, margin: 0 }}>Recent Photos</h2>
            <p style={{ color: "#8B91A8″, fontSize: 13, margin: "3px 0 0" }}>All projects in chronological order</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {PHOTO_GRID.map((p, i) => (
              <div
                key={i}
                style={{ borderRadius: 10, overflow: "hidden", position: "relative", aspectRatio: "4/3″, background: p.gradient, cursor: "pointer" }}
              >
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 10px", background: "linear-gradient(transparent, rgba(0,0,0,0.65))" }}>
                  <span style={{ color: "#fff", fontSize: 11, fontWeight: 500 }}>{p.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Before / After Viewer */}
        <div style={{ background: "#1A1E2A", border: "1px solid #252A3A", borderRadius: 14, padding: 20, marginBottom: 24 }}>
          <div style={{ marginBottom: 14 }}>
            <h2 style={{ color: "#F0F2FF", fontSize: 16, fontWeight: 600, margin: 0 }}>Before / After</h2>
            <p style={{ color: "#8B91A8″, fontSize: 13, margin: "3px 0 0" }}>Roof Replacement — March 2023</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 3px 1fr", gap: 0, borderRadius: 10, overflow: "hidden", height: 200 }}>
            <div style={{ background: "linear-gradient(135deg, #1e293b, #334155)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <span style={{ color: "#94a3b8″, fontSize: 13, fontWeight: 600 }}>BEFORE</span>
              <div style={{ position: "absolute", top: 8, left: 8, background: "#0f172a99″, borderRadius: 6, padding: "3px 8px" }}>
                <span style={{ color: "#94a3b8″, fontSize: 11 }}>Mar 2023</span>
              </div>
            </div>
            <div style={{ background: "#00D4FF", width: 3 }} />
            <div style={{ background: "linear-gradient(135deg, #0c4a2e, #166534)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <span style={{ color: "#86efac", fontSize: 13, fontWeight: 600 }}>AFTER</span>
              <div style={{ position: "absolute", top: 8, right: 8, background: "#0f172a99″, borderRadius: 6, padding: "3px 8px" }}>
                <span style={{ color: "#86efac", fontSize: 11 }}>Apr 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div style={{ background: "linear-gradient(135deg, #A855F711, #00D4FF11)", border: "1px solid #A855F733″, borderRadius: 14, padding: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Sparkles size={18} color="#A855F7″ />
            <h2 style={{ color: "#F0F2FF", fontSize: 15, fontWeight: 600, margin: 0 }}>AI Photo Analysis</h2>
            <span style={{ marginLeft: "auto", background: "#A855F722″, border: "1px solid #A855F744", borderRadius: 6, padding: "2px 8px", color: "#A855F7", fontSize: 11, fontWeight: 600 }}>Auto-generated</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {AI_FINDINGS.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <f.icon size={16} color={f.color} />
                <span style={{ color: "#C8CDE0″, fontSize: 13 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div style={{ background: "#1A1E2A", border: "1px solid #252A3A", borderRadius: 14, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Share2 size={18} color="#00D4FF" />
            <h2 style={{ color: "#F0F2FF", fontSize: 15, fontWeight: 600, margin: 0 }}>Share Your Home's Story</h2>
          </div>
          <p style={{ color: "#8B91A8″, fontSize: 13, margin: "0 0 14px" }}>Generate a shareable link for contractors, inspectors, or insurance providers</p>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, background: "#13161E", border: "1px solid #252A3A", borderRadius: 8, padding: "10px 14px", color: "#8B91A8″, fontSize: 13, fontFamily: "monospace" }}>
              prolnk.io/home/share/abc123def456
            </div>
            <button
              onClick={handleCopyLink}
              style={{
                padding: "10px 18px",
                borderRadius: 8,
                border: "none",
                background: linkCopied ? "#00E67622″ : "#00D4FF22",
                color: linkCopied ? "#00E676″ : "#00D4FF",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {linkCopied ? <CheckCircle size={14} /> : <Copy size={14} />}
              {linkCopied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
