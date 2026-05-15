/**
 * SurgicalFixPanel — Wave 11: Visual Fix Generator
 *
 * Patent core claim: given a photo of a broken/damaged element, generate a
 * photorealistic "after" image that replaces ONLY that element and leaves
 * everything else in the photo completely unchanged.
 *
 * This panel is shown in two contexts:
 *   1. Admin view on the CustomerDealPage — shows the "Generate Fix" button
 *      and the before/after comparison once the fix is ready.
 *   2. Homeowner view — shows the before/after comparison if a fix already
 *      exists (aiFixImageUrl is set on the deal).
 */

import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Wand2, Loader2, ChevronLeft, ChevronRight, ZoomIn,
  AlertTriangle, CheckCircle2, Sparkles, RefreshCw, Eye,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SurgicalFixPanelProps {
  /** The deal token (used to call generateSurgicalFix) */
  token: string;
  /** Issue type slug, e.g. "broken_fence" */
  issueType: string;
  /** Human-readable description of the issue */
  issueDescription: string;
  /** URL of the original photo */
  photoUrl: string;
  /** Pre-existing AI fix URL (if already generated) */
  existingFixUrl?: string | null;
  /** Whether the current viewer is an admin (shows generate button) */
  isAdmin?: boolean;
  /** Called after a new fix is successfully generated */
  onFixGenerated?: (fixUrl: string) => void;
}

// ---------------------------------------------------------------------------
// Before / After Slider
// ---------------------------------------------------------------------------

function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
}: {
  beforeUrl: string;
  afterUrl: string;
}) {
  const [sliderPos, setSliderPos] = useState(50); // 0–100 %
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSlider = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSlider(e.clientX);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) updateSlider(e.clientX);
  };
  const onMouseUp = () => setIsDragging(false);

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSlider(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging) updateSlider(e.touches[0].clientX);
  };
  const onTouchEnd = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-xl cursor-col-resize select-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* BEFORE image (full width, clipped on right) */}
      <img
        src={beforeUrl}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* AFTER image (revealed from left) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={afterUrl}
          alt="After (AI Fix)"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Drag handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center border border-gray-200">
          <div className="flex gap-0.5">
            <ChevronLeft size={10} className="text-gray-500" />
            <ChevronRight size={10} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 z-10">
        <span className="bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
          BEFORE
        </span>
      </div>
      <div
        className="absolute bottom-3 z-10 transition-all"
        style={{ left: `${Math.min(sliderPos + 2, 70)}%` }}
      >
        <span className="bg-teal-600/90 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
          <Sparkles size={10} />
          AI FIX
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function SurgicalFixPanel({
  token,
  issueType,
  issueDescription,
  photoUrl,
  existingFixUrl,
  isAdmin = false,
  onFixGenerated,
}: SurgicalFixPanelProps) {
  const [fixUrl, setFixUrl] = useState<string | null>(existingFixUrl ?? null);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [promptUsed, setPromptUsed] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  // Sync if parent updates existingFixUrl (e.g. after deal refetch)
  useEffect(() => {
    if (existingFixUrl && !fixUrl) setFixUrl(existingFixUrl);
  }, [existingFixUrl]);

  const generateFix = trpc.deals.generateSurgicalFix.useMutation({
    onSuccess: (data) => {
      if (data.fixedImageUrl) {
        setFixUrl(data.fixedImageUrl);
        setPromptUsed(data.promptUsed ?? null);
        onFixGenerated?.(data.fixedImageUrl);
      }
    },
  });

  const handleGenerate = () => {
    generateFix.mutate({
      token,
      issueType,
      issueDescription,
      photoUrl,
      customPrompt: customPrompt.trim() || undefined,
    });
  };

  const isGenerating = generateFix.isPending;
  const hasError = generateFix.isError;

  // If no fix and not admin, render nothing
  if (!fixUrl && !isAdmin) return null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
            <Wand2 size={18} className="text-teal-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-0.5">
              Visual Fix Generator
            </p>
            <h3 className="text-base font-bold text-gray-900 leading-tight">
              {fixUrl ? "AI-Generated Fix Preview" : "Generate Surgical Fix"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {fixUrl
                ? "Drag the slider to compare before and after."
                : "AI will replace only the damaged element — nothing else changes."}
            </p>
          </div>
        </div>

        {fixUrl && (
          <Badge className="bg-teal-50 text-teal-700 border-teal-200 text-xs shrink-0">
            <CheckCircle2 size={10} className="mr-1" />
            Ready
          </Badge>
        )}
      </div>

      {/* Before / After Slider */}
      {fixUrl && (
        <div className="px-5 pb-4">
          <BeforeAfterSlider beforeUrl={photoUrl} afterUrl={fixUrl} />

          {/* Prompt disclosure (admin only) */}
          {isAdmin && promptUsed && (
            <div className="mt-3">
              <button
                onClick={() => setShowPrompt(v => !v)}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Eye size={12} />
                {showPrompt ? "Hide prompt" : "View AI prompt used"}
              </button>
              {showPrompt && (
                <div className="mt-2 bg-gray-50 rounded-lg p-3 text-xs text-gray-600 leading-relaxed font-mono">
                  {promptUsed}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Admin controls */}
      {isAdmin && (
        <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-3">
          {/* Custom prompt toggle */}
          <button
            onClick={() => setShowCustomPrompt(v => !v)}
            className="text-xs text-gray-400 hover:text-teal-600 transition-colors flex items-center gap-1"
          >
            <Wand2 size={11} />
            {showCustomPrompt ? "Use default prompt" : "Customize the AI prompt"}
          </button>

          {showCustomPrompt && (
            <Textarea
              value={customPrompt}
              onChange={e => setCustomPrompt(e.target.value)}
              placeholder={`Replace ONLY the ${issueType.replace(/_/g, " ")} with a brand new professionally installed replacement...`}
              className="text-sm resize-none min-h-[80px]"
              rows={3}
            />
          )}

          {hasError && (
            <div className="flex items-start gap-2 bg-red-50 rounded-lg px-3 py-2">
              <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-xs text-red-600">
                {(generateFix.error as any)?.message || "Generation failed. Please try again."}
              </p>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`w-full font-semibold py-2.5 rounded-xl text-sm ${
              fixUrl
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                : "bg-[#0D9488] hover:bg-teal-700 text-white"
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 size={15} className="animate-spin mr-2" />
                Generating surgical fix... (~15s)
              </>
            ) : fixUrl ? (
              <>
                <RefreshCw size={15} className="mr-2" />
                Regenerate Fix
              </>
            ) : (
              <>
                <Sparkles size={15} className="mr-2" />
                Generate AI Fix
              </>
            )}
          </Button>

          {!fixUrl && (
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              Uses GPT Image inpainting (~$0.06). Fix is saved to the deal and shown to the homeowner.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
