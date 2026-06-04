import { useState } from "react";
import { Eye, Send, CheckCircle, ToggleLeft, ToggleRight, Clock, Image, FileText, Layout } from "lucide-react";

const recentJobs = [
  { id: "J-1082", label: "J-1082 — HVAC Tune-up (Martinez)" },
  { id: "J-1079", label: "J-1079 — Roof Inspection (Chen)" },
  { id: "J-1074", label: "J-1074 — Plumbing Repair (Johnson)" },
  { id: "J-1068", label: "J-1068 — Electrical Panel (Williams)" },
];

const activePortals = [
  { name: "Sarah Martinez", job: "HVAC Tune-up", sent: "May 13", lastViewed: "Today", views: 4, status: "Active" },
  { name: "Kevin Chen", job: "Roof Inspection", sent: "May 10", lastViewed: "May 12", views: 2, status: "Active" },
  { name: "Marcus Johnson", job: "Plumbing Repair", sent: "May 7", lastViewed: "May 8", views: 7, status: "Completed" },
  { name: "Patricia Williams", job: "Electrical Panel", sent: "May 3", lastViewed: "May 9", views: 3, status: "Active" },
  { name: "David Thompson", job: "Deck Refinish", sent: "Apr 28", lastViewed: "Apr 30", views: 5, status: "Completed" },
];

const previewCards = [
  {
    icon: <Layout className="w-5 h-5 text-teal-400" />,
    title: "Job Progress Timeline",
    desc: "Homeowner sees each phase — scheduled, started, milestones, complete.",
  },
  {
    icon: <FileText className="w-5 h-5 text-blue-400" />,
    title: "Invoice & Payment",
    desc: "View itemized invoice, payment status, and pay securely via card.",
  },
  {
    icon: <Image className="w-5 h-5 text-purple-400" />,
    title: "Photo Updates",
    desc: "Before / during / after photos uploaded directly from your phone.",
  },
];

export default function ClientPortalInvite() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    job: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [autoPortal, setAutoPortal] = useState(false);

  const personalMsg =
    form.name
      ? `Hi ${form.name}, here's your project portal link so you can track your job progress, view photos, and access your invoice anytime.`
      : "Hi {name}, here's your project portal link so you can track your job progress, view photos, and access your invoice anytime.";

  function handleSend() {
    if (!form.name || !form.phone || !form.job) return;
    const msg = form.message || personalMsg;
    navigator.clipboard.writeText(msg);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", phone: "", email: "", job: "", message: "" });
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-white">Client Portal</h1>
            <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 font-bold">Preview</span>
          </div>
          <p className="text-gray-400 mt-1">Give your customers a window into their job — automated invites are coming soon</p>
        </div>

        {/* Analytics banner */}
        <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 flex items-center gap-4">
          <div className="text-3xl font-bold text-teal-400">87%</div>
          <div>
            <p className="text-white text-sm font-medium">
              Customers who use the portal are 87% more likely to refer.
            </p>
            <p className="text-gray-400 text-xs mt-0.5">
              Your portal adoption: <span className="text-yellow-400 font-semibold">34%</span> — room to grow!
            </p>
          </div>
        </div>

        {/* What clients see */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">What Clients See</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {previewCards.map((c) => (
              <div
                key={c.title}
                className="bg-[#0F1E35] border border-[#1E3A5F] rounded-xl p-4 flex flex-col gap-2"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  {c.icon}
                </div>
                <p className="text-white text-sm font-medium">{c.title}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Send invite form */}
        <div className="bg-[#0F1E35] border border-[#1E3A5F] rounded-xl p-5">
          <h2 className="text-white font-semibold text-lg mb-4">Send Portal Invite</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Homeowner Name *</label>
                <input
                  className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-teal-500"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value, message: "" })}
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Phone Number * (SMS invite)</label>
                <input
                  className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-teal-500"
                  placeholder="(214) 555-0123"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Email (optional)</label>
                <input
                  className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-teal-500"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Job Reference *</label>
                <select
                  className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500"
                  value={form.job}
                  onChange={(e) => setForm({ ...form, job: e.target.value })}
                >
                  <option value="">Select a job...</option>
                  {recentJobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Personal Message</label>
              <textarea
                rows={3}
                className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-teal-500 resize-none"
                value={form.message || personalMsg}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!form.name || !form.phone || !form.job}
              className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {sent ? (
                <>
                  <CheckCircle className="w-5 h-5" /> Invite message copied — paste to your client
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Copy Portal Invite
                </>
              )}
            </button>
          </div>
        </div>

        {/* Auto-portal toggle */}
        <div className="bg-[#0F1E35] border border-[#1E3A5F] rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-medium">Enable auto-portal</p>
            <p className="text-gray-400 text-xs mt-0.5">
              Automatically send portal link when a job is accepted
            </p>
          </div>
          <button onClick={() => setAutoPortal(!autoPortal)} className="shrink-0">
            {autoPortal ? (
              <ToggleRight className="w-8 h-8 text-teal-400" />
            ) : (
              <ToggleLeft className="w-8 h-8 text-gray-500" />
            )}
          </button>
        </div>

        {/* Active portals table */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-white font-semibold text-lg">Active Portals</h2>
            <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-700 text-slate-400 font-semibold">Sample data</span>
          </div>
          <div className="bg-[#0F1E35] border border-[#1E3A5F] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1E3A5F]">
                  {["Homeowner", "Job", "Sent", "Last Viewed", "Views", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-gray-500 text-xs font-medium px-4 py-3 first:pl-5"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activePortals.map((p) => (
                  <tr key={p.name} className="border-b border-[#1E3A5F] last:border-0 hover:bg-[#1E3A5F]/20">
                    <td className="px-5 py-3 text-white font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-gray-400">{p.job}</td>
                    <td className="px-4 py-3 text-gray-400">{p.sent}</td>
                    <td className="px-4 py-3 text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 shrink-0" /> {p.lastViewed}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-gray-500" /> {p.views}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          p.status === "Active"
                            ? "bg-teal-500/20 text-teal-300"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
