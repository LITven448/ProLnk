import { useState, useRef, useEffect } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Camera, Send, Bot, User, Wrench, ShoppingCart, Users, ChevronRight,
  AlertTriangle, CheckCircle, Info, Loader2, X, ImagePlus, Sparkles,
  DollarSign, Clock, ArrowRight, ExternalLink
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = "intro" | "input" | "interview" | "result";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
};

type DiagnosticResult = {
  sessionId: number;
  isComplete: boolean;
  nextQuestion: string | null;
  diagnosis: string | null;
  trade: string;
  severity: string | null;
  scope?: string | null;
  recommendation: string | null;
  quote: {
    min: number;
    max: number;
    materials: number;
    labor: number;
    breakdown: Array<{
      item: string;
      qty: number;
      unit: string;
      unitCostMin: number;
      unitCostMax: number;
      lineMin: number;
      lineMax: number;
    }>;
  } | null;
  options: {
    products: Array<{
      id: number;
      productName: string;
      brand: string | null;
      amazonUrl: string;
      affiliateUrl: string | null;
      price: string | null;
      imageUrl: string | null;
    }>;
    partners: Array<{
      id: number;
      businessName: string;
      businessType: string;
      rating: string | null;
      reviewCount: number | null;
      tier: string;
      contactPhone: string | null;
      website: string | null;
    }>;
  } | null;
};

// ─── Severity config ──────────────────────────────────────────────────────────
const SEVERITY_CONFIG = {
  urgent: { color: "bg-red-100 text-red-800 border-red-200", icon: AlertTriangle, label: "Urgent" },
  soon: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: Clock, label: "Address Soon" },
  monitor: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Info, label: "Monitor" },
  diy: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle, label: "Easy DIY" },
};

// ─── Suggested prompts ────────────────────────────────────────────────────────
const SUGGESTED_PROMPTS = [
  "My toilet is leaking from the base",
  "AC isn't cooling — blowing warm air",
  "I have a crack in my drywall",
  "Roof shingles are missing after the storm",
  "My fence blew down",
  "Water heater making popping sounds",
  "Electrical outlet stopped working",
  "Bathroom faucet won't stop dripping",
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function HomeDiagnostic() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [photos, setPhotos] = useState<Array<{ data: string; type: string; name: string; preview: string }>>([]);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const startDiagnosis = trpc.diagnostic.start.useMutation();
  const continueInterview = trpc.diagnostic.continue.useMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Photo handling ──────────────────────────────────────────────────────────
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (photos.length + files.length > 4) {
      toast.error("Maximum 4 photos allowed");
      return;
    }
    files.forEach(file => {
      if (file.size > 16 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 16MB)`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const data = ev.target?.result as string;
        setPhotos(prev => [...prev, {
          data,
          type: file.type,
          name: file.name,
          preview: data,
        }]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removePhoto = (idx: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  // ── Upload photos to S3 ─────────────────────────────────────────────────────
  const uploadPhotos = async (): Promise<string[]> => {
    if (!photos.length) return [];
    setUploadingPhotos(true);
    try {
      const res = await fetch("/api/upload-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos: photos.map(p => ({ data: p.data, type: p.type, name: p.name })) }),
      });
      if (!res.ok) throw new Error("Upload failed");
      const { urls } = await res.json();
      return urls as string[];
    } catch {
      toast.error("Photo upload failed. Continuing without photos.");
      return [];
    } finally {
      setUploadingPhotos(false);
    }
  };

  // ── Start diagnosis ─────────────────────────────────────────────────────────
  const handleStart = async () => {
    if (!inputText.trim() && !photos.length) {
      toast.error("Please describe the issue or add a photo");
      return;
    }

    setIsLoading(true);
    setPhase("interview");

    const userMsg: Message = {
      role: "user",
      content: inputText || "[Photo(s) provided]",
      timestamp: Date.now(),
    };
    setMessages([userMsg]);

    try {
      const photoUrls = await uploadPhotos();

      const res = await startDiagnosis.mutateAsync({
        description: inputText || undefined,
        photoUrls: photoUrls.length ? photoUrls : undefined,
      });

      setSessionId(typeof res.sessionId === 'number' ? res.sessionId : null);

      const assistantMsg: Message = {
        role: "assistant",
        content: res.isComplete
          ? (res.diagnosis ?? "Diagnosis complete.")
          : (res.nextQuestion ?? "Can you tell me more?"),
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMsg]);

      if (res.isComplete) {
        setResult(res as unknown as DiagnosticResult);
        setPhase("result");
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Diagnosis failed. Please try again.");
      setPhase("input");
    } finally {
      setIsLoading(false);
    }
  };

  // ── Continue interview ──────────────────────────────────────────────────────
  const handleAnswer = async () => {
    if (!inputText.trim() || sessionId === null) return;

    const userMsg: Message = {
      role: "user",
      content: inputText,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await continueInterview.mutateAsync({
        sessionId: sessionId!,
        answer: userMsg.content,
      });

      const assistantMsg: Message = {
        role: "assistant",
        content: res.isComplete
          ? (res.diagnosis ?? "Diagnosis complete.")
          : (res.nextQuestion ?? "Can you tell me more?"),
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMsg]);

      if (res.isComplete) {
        setResult(res as unknown as DiagnosticResult);
        setPhase("result");
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (phase === "input") handleStart();
      else if (phase === "interview") handleAnswer();
    }
  };

  const resetDiagnosis = () => {
    setPhase("intro");
    setSessionId(null);
    setMessages([]);
    setInputText("");
    setPhotos([]);
    setResult(null);
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <HomeownerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Home Diagnostic</h1>
              <p className="text-sm text-gray-500">Describe your issue — get a real answer in minutes</p>
            </div>
          </div>
        </div>

        {/* ── INTRO PHASE ── */}
        {phase === "intro" && (
          <div className="space-y-6">
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-5 pb-4">
                <p className="text-sm text-amber-800 leading-relaxed">
                  <strong>How it works:</strong> Describe your home issue (or upload a photo), and our AI will ask a few targeted questions — then give you a real diagnosis with three options: fix it yourself, hire a pro, or get competitive bids.
                </p>
              </CardContent>
            </Card>

            {/* Suggested prompts */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Common issues — tap to start:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => { setInputText(prompt); setPhase("input"); }}
                    className="text-sm px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-amber-300 transition-colors text-gray-700"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setPhase("input")}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              size="lg"
            >
              Describe My Issue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {/* ── INPUT PHASE ── */}
        {phase === "input" && (
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-5 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Describe the issue</label>
                  <Textarea
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. My toilet is leaking from the back of the tank. Water pools on the floor behind it..."
                    className="min-h-[120px] resize-none"
                    autoFocus
                  />
                </div>

                {/* Photo upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Add photos (optional, up to 4)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {photos.map((p, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                        <img src={p.preview} alt="Uploaded photo" className="w-full h-full object-cover" />
                        <button
                          onClick={() => removePhoto(i)}
                          className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                    {photos.length < 4 && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 hover:border-amber-400 hover:bg-amber-50 transition-colors"
                      >
                        <ImagePlus className="w-5 h-5 text-gray-400" />
                        <span className="text-xs text-gray-400">Add photo</span>
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoSelect}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPhase("intro")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleStart}
                    disabled={isLoading || uploadingPhotos || (!inputText.trim() && !photos.length)}
                    className="flex-2 bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    {isLoading || uploadingPhotos ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
                    ) : (
                      <><Send className="w-4 h-4 mr-2" /> Start Diagnosis</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── INTERVIEW PHASE ── */}
        {phase === "interview" && (
          <div className="space-y-4">
            {/* Chat messages */}
            <div className="space-y-3 min-h-[200px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-amber-600" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-amber-500 text-white rounded-tr-sm"
                      : "bg-gray-100 text-gray-800 rounded-tl-sm"
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Answer input */}
            {!isLoading && (
              <div className="flex gap-2">
                <Textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your answer..."
                  className="resize-none min-h-[60px]"
                  autoFocus
                />
                <Button
                  onClick={handleAnswer}
                  disabled={!inputText.trim()}
                  className="bg-amber-500 hover:bg-amber-600 text-white self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ── RESULT PHASE ── */}
        {phase === "result" && result && (
          <div className="space-y-5">
            {/* Diagnosis summary */}
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg font-semibold text-gray-900">Diagnosis</CardTitle>
                  <Badge className={`${(result.severity && SEVERITY_CONFIG[result.severity as keyof typeof SEVERITY_CONFIG]?.color) || "bg-gray-100 text-gray-700"} border text-xs font-medium`}>
                    {(result.severity && SEVERITY_CONFIG[result.severity as keyof typeof SEVERITY_CONFIG]?.label) || result.severity || "Unknown"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <p className="text-sm text-gray-700 leading-relaxed">{result.diagnosis}</p>
                {result.scope && (
                  <div className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                    <strong>Scope:</strong> {result.scope}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Live quote */}
            {result.quote && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold text-green-900 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Live Cost Estimate — DFW Market Rates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 text-center border border-green-200">
                      <p className="text-xs text-gray-500 mb-1">Materials</p>
                      <p className="text-sm font-bold text-gray-900">${result.quote.materials.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border border-green-200">
                      <p className="text-xs text-gray-500 mb-1">Labor</p>
                      <p className="text-sm font-bold text-gray-900">${result.quote.labor.toLocaleString()}</p>
                    </div>
                    <div className="bg-amber-100 rounded-lg p-3 text-center border border-amber-200">
                      <p className="text-xs text-amber-700 mb-1">Total Range</p>
                      <p className="text-sm font-bold text-amber-900">${result.quote.min.toLocaleString()}–${result.quote.max.toLocaleString()}</p>
                    </div>
                  </div>

                  {result.quote.breakdown.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-600">Materials breakdown:</p>
                      <div className="bg-white rounded-lg border border-green-200 divide-y divide-gray-100">
                        {result.quote.breakdown.slice(0, 6).map((item, i) => (
                          <div key={i} className="flex items-center justify-between px-3 py-2 text-xs">
                            <span className="text-gray-700">{item.item} × {item.qty} {item.unit}</span>
                            <span className="font-medium text-gray-900">${item.lineMin}–${item.lineMax}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-400">Estimate based on current DFW market rates. Actual costs may vary.</p>
                </CardContent>
              </Card>
            )}

            {/* 3 Options */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Your 3 Options</h3>
              {/* Option A: DIY — show if products available */}
              {result.options && result.options.products.length > 0 && (
                <Card className="border-blue-200 hover:border-blue-400 transition-colors">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Wrench className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-900 text-sm">A — DIY with the Right Parts</p>
                          <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">Save on Labor</Badge>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          If you're comfortable with basic repairs, here are the parts you'll need.
                        </p>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-600">Recommended parts:</p>
                          {result.options.products.slice(0, 4).map((product, i) => (
                            <a
                              key={i}
                              href={product.affiliateUrl ?? product.amazonUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-2 transition-colors group"
                            >
                              <div>
                                <p className="text-xs font-medium text-gray-800">{product.productName}</p>
                                {product.brand && <p className="text-xs text-gray-500">{product.brand}</p>}
                                {product.price && <p className="text-xs text-green-700 font-medium">{product.price}</p>}
                              </div>
                              <div className="flex items-center gap-1 text-blue-600 group-hover:text-blue-700">
                                <ShoppingCart className="w-3 h-3" />
                                <span className="text-xs">Buy</span>
                                <ExternalLink className="w-3 h-3" />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              {/* Option B: Hire a Pro */}
              <Card className="border-amber-200 hover:border-amber-400 transition-colors">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900 text-sm">B — Hire a ProLnk Partner</p>
                        <Badge variant="outline" className="text-xs border-amber-200 text-amber-700">Vetted Pros</Badge>
                      </div>
                      {result.options && result.options.partners.length > 0 ? (
                        <div className="space-y-1">
                          {result.options.partners.slice(0, 3).map((partner, i) => (
                            <div key={i} className="flex items-center justify-between bg-amber-50 rounded-lg px-3 py-2">
                              <div>
                                <p className="text-xs font-medium text-gray-800">{partner.businessName}</p>
                                <p className="text-xs text-gray-500">{partner.tier} tier{partner.rating ? ` • ${partner.rating}★` : ""}</p>
                              </div>
                              {partner.contactPhone && (
                                <a href={`tel:${partner.contactPhone}`} className="text-xs text-amber-700 font-medium hover:underline">
                                  Call
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-600">Connect with a vetted {result.trade} professional in your area.</p>
                      )}
                      <Link href="/my-home/pros">
                        <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white text-xs mt-1">
                          Find a {result.trade} Pro Near Me <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Option C: Post to Exchange */}
              <Card className="border-purple-200 hover:border-purple-400 transition-colors">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Camera className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900 text-sm">C — Post to the Exchange</p>
                        <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">Get Bids</Badge>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Post your job to the ProLnk Exchange and let qualified contractors bid. You pick the best offer.
                      </p>
                      {result.quote && (
                        <p className="text-xs text-gray-500">
                          💡 Suggested budget: ${result.quote.min.toLocaleString()}–${result.quote.max.toLocaleString()}
                        </p>
                      )}
                      <Link href="/dashboard/exchange">
                        <Button size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 text-xs mt-1">
                          Post to Exchange <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Start over */}
            <Button
              variant="outline"
              onClick={resetDiagnosis}
              className="w-full"
            >
              Diagnose Another Issue
            </Button>
          </div>
        )}
      </div>
    </HomeownerLayout>
  );
}
