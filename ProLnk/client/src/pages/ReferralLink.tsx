import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { QRCodeSVG } from "qrcode.react";
import {
  Link2, Copy, Share2, CheckCircle, TrendingUp, Users, DollarSign,
  QrCode, Download, MessageSquare, Mail, Twitter, Linkedin, Facebook,
  ExternalLink, Sparkles, Gift, Send, Phone
} from "lucide-react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- Social share helpers -----------------------------------------------------
function shareToLinkedIn(url: string, text: string) {
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`, "_blank");
}
function shareToTwitter(url: string, text: string) {
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
}
function shareToFacebook(url: string) {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
}

// --- QR download helper -------------------------------------------------------
function downloadQR(svgRef: React.RefObject<SVGSVGElement | null>, filename: string) {
  if (!svgRef.current) return;
  const svg = svgRef.current;
  const canvas = document.createElement("canvas");
  const size = 400;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const xml = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  img.onload = () => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    const a = document.createElement("a");
    a.download = filename;
    a.href = canvas.toDataURL("image/png");
    a.click();
  };
  img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
}

function ReferHomeownerQuickSend() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const referMutation = trpc.partners.referHomeowner.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      setName("");
      setPhone("");
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Phone size={16} className="text-emerald-600" />
        <p className="text-sm font-semibold text-gray-900">Refer a Homeowner</p>
      </div>
      <p className="text-xs text-gray-500 mb-3">Send a quick SMS invite to a homeowner you know. They'll get a link to TrustyPro.</p>
      <div className="flex gap-2">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-sm"
        />
        <Input
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="text-sm"
        />
        <Button
          size="sm"
          disabled={!name || phone.replace(/\D/g, "").length < 10 || referMutation.isPending}
          onClick={() => referMutation.mutate({ homeownerName: name, homeownerPhone: phone })}
          className="gap-1 shrink-0"
        >
          <Send size={14} /> Send
        </Button>
      </div>
    </div>
  );
}

export default function ReferralLink() {
  const { data: profile, isLoading } = trpc.partners.getMyProfile.useQuery();
  const { data: networkData } = trpc.network.getDashboard.useQuery();
  const { data: stats } = trpc.referralTracking.getStats.useQuery();
  const trackClick = trpc.referralTracking.trackClick.useMutation();

  const [copied, setCopied] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [activeTab, setActiveTab] = useState<"social" | "message" | "qr">("social");
  const qrRef = useRef<SVGSVGElement>(null);

  const partner = profile?.partner;
  const baseUrl = window.location.origin;
  // Prefer the network system's referral code (6-char), fall back to legacy partner-id format
  const referralCode = networkData?.referralCode ?? (partner ? `partner-${partner.id}` : "loading");
  const referralUrl = networkData?.referralLink ?? `${baseUrl}/join?ref=${referralCode}`;
  // UTM-tagged URLs per channel for accurate attribution
  const utmLinkedIn = `${referralUrl}&utm_source=linkedin&utm_medium=social&utm_campaign=partner_referral`;
  const utmTwitter = `${referralUrl}&utm_source=twitter&utm_medium=social&utm_campaign=partner_referral`;
  const utmFacebook = `${referralUrl}&utm_source=facebook&utm_medium=social&utm_campaign=partner_referral`;
  const utmSms = `${referralUrl}&utm_source=sms&utm_medium=referral&utm_campaign=partner_referral`;
  const utmEmail = `${referralUrl}&utm_source=email&utm_medium=referral&utm_campaign=partner_referral`;
  const utmQr = `${referralUrl}&utm_source=qr&utm_medium=print&utm_campaign=partner_referral`;
  const partnerName = partner?.contactName ?? "a ProLnk partner";
  const businessName = partner?.businessName ?? "my business";

  const smsMessage = `Hey! I'm part of the ProLnk Partner Network -- a platform that automatically routes home service leads between local contractors. If you do any home services in DFW, you should check it out. Here's my referral link: ${utmSms}`;
  const emailSubject = "Join me on ProLnk -- Get home service leads automatically";
  const emailBody = `Hi,\n\nI've been using ProLnk, a partner network that routes home service leads between local contractors automatically. When I finish a job, the AI scans for other services the homeowner needs and sends those leads to the right partner in the network.\n\nI thought you'd be a great fit. Use my referral link to apply:\n\n${utmEmail}\n\nLet me know if you have questions!\n\n${partnerName}\n${businessName}`;
  const linkedInText = `I've been using ProLnk to get more home service leads in DFW -- the AI automatically routes opportunities between partner businesses. If you're in home services, check it out:`;
  const twitterText = `Just joined @ProLnk -- an AI-powered partner network that automatically routes home service leads between contractors in DFW. If you're in home services, apply here:`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    if (partner) trackClick.mutate({ referralCode });
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(smsMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2500);
  };

  const shareNative = () => {
    if (navigator.share) {
      navigator.share({ title: "Join ProLnk Partner Network", text: smsMessage, url: utmSms });
    }
  };

  const TABS = [
    { id: "social" as const, label: "Social Media", icon: <Share2 size={14} /> },
    { id: "message" as const, label: "Text / Email", icon: <MessageSquare size={14} /> },
    { id: "qr" as const, label: "QR Code", icon: <QrCode size={14} /> },
  ];

  return (
    <PartnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5E642]/10 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-[#0A1628]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Referral Hub</h1>
              <p className="text-sm text-gray-500">Invite home service pros -- earn $25 per approved partner</p>
            </div>
          </div>
          <Badge className="bg-[#0A1628]/10 text-[#0A1628] border-0 gap-1">
            <Gift size={12} /> $25 per referral
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Link Clicks", value: stats?.clicks ?? 0, icon: <TrendingUp className="w-4 h-4 text-blue-600" />, bg: "bg-blue-50", color: "text-blue-700" },
            { label: "Partners Joined", value: stats?.conversions ?? 0, icon: <Users className="w-4 h-4 text-[#0A1628]" />, bg: "bg-[#F5E642]/10", color: "text-[#0A1628]" },
            { label: "Recruited (DB)", value: partner?.partnersReferred ?? 0, icon: <Users className="w-4 h-4 text-purple-600" />, bg: "bg-purple-50", color: "text-purple-700" },
            { label: "Bonus Earned", value: `$${stats?.bonusEarned ?? 0}`, icon: <DollarSign className="w-4 h-4 text-green-600" />, bg: "bg-green-50", color: "text-green-700" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-xs text-gray-500">{stat.label}</span>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{isLoading ? "--" : stat.value}</p>
            </div>
          ))}
        </div>

        {/* Link card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-900">Your Unique Referral Link</p>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-mono">{referralCode}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 font-mono text-sm text-gray-700 truncate border border-gray-200">
              {isLoading ? "Loading..." : referralUrl}
            </div>
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-medium flex-shrink-0 transition-all"
              style={{ backgroundColor: copied ? "#10b981" : "#0A1628" }}
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Share tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-gray-100">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-[#0A1628] border-b-2 border-[#0A1628] bg-[#F5E642]/10/40"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="p-5">
            {/* Social Media Tab */}
            {activeTab === "social" && (
              <div className="space-y-3">
                <p className="text-xs text-gray-500 mb-4">Share on social media to reach your professional network</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => shareToLinkedIn(utmLinkedIn, linkedInText)}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                      <Linkedin className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">LinkedIn</p>
                      <p className="text-xs text-gray-400">Professional network</p>
                    </div>
                    <ExternalLink size={12} className="ml-auto text-gray-300 group-hover:text-blue-400" />
                  </button>

                  <button
                    onClick={() => shareToTwitter(utmTwitter, twitterText)}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center shrink-0">
                      <Twitter className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">X / Twitter</p>
                      <p className="text-xs text-gray-400">Reach contractors</p>
                    </div>
                    <ExternalLink size={12} className="ml-auto text-gray-300 group-hover:text-gray-400" />
                  </button>

                  <button
                    onClick={() => shareToFacebook(utmFacebook)}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                      <Facebook className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">Facebook</p>
                      <p className="text-xs text-gray-400">Local groups</p>
                    </div>
                    <ExternalLink size={12} className="ml-auto text-gray-300 group-hover:text-blue-400" />
                  </button>
                </div>

                {typeof navigator !== "undefined" && "share" in navigator && (
                  <button
                    onClick={shareNative}
                    className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" /> More sharing options...
                  </button>
                )}
              </div>
            )}

            {/* Text / Email Tab */}
            {activeTab === "message" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`sms:?body=${encodeURIComponent(smsMessage)}`}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-green-700">Text Message</p>
                      <p className="text-xs text-gray-400">Opens Messages app</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">Email</p>
                      <p className="text-xs text-gray-400">Opens Mail app</p>
                    </div>
                  </a>
                </div>

                {/* Pre-written message */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-700">Pre-Written Message</p>
                    <button onClick={copyMessage} className="text-xs text-[#0A1628] hover:text-[#0A1628] font-medium flex items-center gap-1">
                      {copiedMsg ? <><CheckCircle size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed border border-gray-100">
                    {smsMessage}
                  </div>
                </div>
              </div>
            )}

            {/* QR Code Tab */}
            {activeTab === "qr" && (
              <div className="flex flex-col items-center gap-4">
                <p className="text-xs text-gray-500 text-center">Print or display this QR code on your truck, business card, or job site</p>
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center gap-3 shadow-sm">
                  <QRCodeSVG
                    ref={qrRef}
                    value={utmQr}
                    size={180}
                    fgColor="#0A1628"
                    bgColor="#ffffff"
                    level="H"
                    includeMargin={false}
                  />
                  <p className="text-xs text-gray-400 font-mono">{referralCode}</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadQR(qrRef, `prolnk-qr-${referralCode}.png`)}
                    className="gap-1.5"
                  >
                    <Download size={14} /> Download PNG
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyLink}
                    className="gap-1.5"
                  >
                    {copied ? <><CheckCircle size={14} /> Copied!</> : <><Copy size={14} /> Copy Link</>}
                  </Button>
                </div>
                <p className="text-xs text-gray-400 text-center max-w-xs">
                  Tip: Add this to your email signature, vehicle wrap, or business cards for passive referrals
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Refer a Homeowner Quick Send */}
        <ReferHomeownerQuickSend />

        {/* How it works */}
        <div className="bg-[#F5E642]/10 rounded-xl p-5 border border-teal-100">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-[#0A1628]" />
            <p className="text-sm font-semibold text-teal-800">How Referral Bonuses Work</p>
          </div>
          <div className="space-y-2">
            {[
              "Share your unique link with any home service pro in DFW",
              "They apply using your link -- you get credit for the referral",
              "Once they're approved and log their first job, you earn a $25 bonus",
              "No limit -- refer as many partners as you want",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0A1628] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-xs text-[#0A1628]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}
