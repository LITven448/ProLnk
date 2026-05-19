import React from 'react';
import type React from "react";
import { useState, useRef, useCallback } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload, ImageIcon, Loader2, GripVertical, TrendingUp,
  ChefHat, Bath, Home, TreePine, Grid3X3, Scissors,
} from "lucide-react";
import { Link } from "wouter";

type ProjectType =
  | "Kitchen Remodel"
  | "Bathroom Refresh"
  | "Exterior Paint"
  | "Landscaping"
  | "Flooring"
  | "Roof Replacement";

type StylePref = "Modern" | "Traditional" | "Farmhouse";

const PROJECT_ICONS: Record<ProjectType, React.ElementType> = {
  "Kitchen Remodel": ChefHat,
  "Bathroom Refresh": Bath,
  "Exterior Paint": Home,
  Landscaping: TreePine,
  Flooring: Grid3X3,
  "Roof Replacement": Scissors,
};

const ROI_MAP: Record<ProjectType, { amount: string; pct: string }> = {
  "Kitchen Remodel":   { amount: "+$24,500", pct: "70%" },
  "Bathroom Refresh":  { amount: "+$14,200", pct: "64%" },
  "Exterior Paint":    { amount: "+$8,900",  pct: "77%" },
  Landscaping:         { amount: "+$11,400", pct: "100%" },
  Flooring:            { amount: "+$18,500", pct: "75%" },
  "Roof Replacement":  { amount: "+$22,000", pct: "68%" },
};

const PROJECTS: ProjectType[] = [
  "Kitchen Remodel",
  "Bathroom Refresh",
  "Exterior Paint",
  "Landscaping",
  "Flooring",
  "Roof Replacement",
];

const STYLES: StylePref[] = ["Modern", "Traditional", "Farmhouse"];

const PLACEHOLDER_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect width='800' height='500' fill='%231e293b'/%3E%3Crect x='100' y='80' width='600' height='340' rx='8' fill='%2334495e'/%3E%3Crect x='100' y='80' width='600' height='200' fill='%2347606e'/%3E%3Crect x='300' y='280' width='200' height='140' rx='4' fill='%2334495e'/%3E%3Ccircle cx='400' cy='250' r='60' fill='%2394a3b8' opacity='0.3'/%3E%3Ctext x='400' y='440' text-anchor='middle' fill='%2394a3b8' font-size='16' font-family='sans-serif'%3EYour Photo Here%3C/text%3E%3C/svg%3E";

export default function BeforeAfterGenerator() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [project, setProject] = useState<ProjectType | null>(null);
  const [style, setStyle] = useState<StylePref | null>(null);
  const [budget, setBudget] = useState(25000);
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  function generate() {
    if (!project) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  }

  const handleSlider = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!dragging || !sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
      setSliderPos(pct);
    },
    [dragging]
  );

  const roi = project ? ROI_MAP[project] : null;
  const displayBefore = previewUrl ?? PLACEHOLDER_DATA_URL;

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-white">Before &amp; After Generator</h1>
            <p className="text-slate-400 mt-1">See how upgrades could transform your home</p>
          </div>

          {/* Upload area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={onDrop}
            onClick={() => !previewUrl && fileRef.current?.click()}
            className={`relative rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
              isDragOver
                ? "border-teal-400 bg-teal-500/10"
                : previewUrl
                ? "border-slate-700 cursor-default"
                : "border-slate-600 bg-slate-800/40 hover:border-teal-500/50 hover:bg-slate-800/60"
            }`}
          >
            {previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Uploaded preview"
                  className="w-full max-h-64 object-cover"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setPreviewUrl(null); setGenerated(false); }}
                  className="absolute top-2 right-2 bg-slate-900/80 text-slate-300 hover:text-white text-xs px-2 py-1 rounded"
                >
                  Replace
                </button>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center">
                  <ImageIcon className="h-7 w-7 text-slate-400" />
                </div>
                <div className="text-center">
                  <p className="text-white font-medium">Upload a photo of your room or exterior</p>
                  <p className="text-slate-500 text-sm mt-1">Drag &amp; drop or click to browse · Max 16 MB</p>
                </div>
                <Upload className="h-4 w-4 text-teal-400 mt-1" />
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
          </div>

          {/* Project type */}
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">Project type</p>
            <div className="grid grid-cols-3 gap-3">
              {PROJECTS.map((p) => {
                const Icon = PROJECT_ICONS[p];
                return (
                  <button
                    key={p}
                    onClick={() => { setProject(p); setGenerated(false); }}
                    className={`flex flex-col items-center gap-2 rounded-xl p-4 border transition-all ${
                      project === p
                        ? "border-teal-400 bg-teal-500/10 text-teal-300"
                        : "border-slate-700 bg-slate-800/60 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs font-medium text-center leading-tight">{p}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Style preferences */}
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">Style preference</p>
            <div className="flex gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    style === s
                      ? "bg-teal-500/20 border-teal-400 text-teal-300"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Budget slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs uppercase tracking-wider text-slate-400">Budget range</p>
              <span className="text-teal-300 font-semibold text-sm">${budget.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">$5,000</span>
              <input
                type="range"
                min={5000}
                max={50000}
                step={500}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="flex-1 accent-teal-500"
              />
              <span className="text-xs text-slate-500">$50,000</span>
            </div>
          </div>

          {/* Generate button */}
          <Button
            onClick={generate}
            disabled={!project || generating}
            className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-sm font-semibold h-11"
          >
            {generating ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating Preview…</>
            ) : (
              "Generate Preview"
            )}
          </Button>

          {/* Before / After result */}
          {generated && (
            <Card className="bg-slate-800/60 border-slate-700 overflow-hidden">
              <CardContent className="p-0">
                {/* Slider */}
                <div
                  ref={sliderRef}
                  className="relative select-none cursor-ew-resize"
                  style={{ aspectRatio: "16/9" }}
                  onMouseMove={handleSlider}
                  onMouseDown={() => setDragging(true)}
                  onMouseUp={() => setDragging(false)}
                  onMouseLeave={() => setDragging(false)}
                  onTouchMove={(e) => { setDragging(true); handleSlider(e); }}
                  onTouchEnd={() => setDragging(false)}
                >
                  {/* After side (full width underneath) */}
                  <div className="absolute inset-0 bg-[#0A1628] flex items-center justify-center">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(20,184,166,0.3) 0%, rgba(15,23,42,0.95) 100%)",
                      }}
                    />
                    <img
                      src={displayBefore}
                      alt="After visualization"
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                      style={{ filter: "hue-rotate(30deg) saturate(1.4) brightness(1.1)" }}
                    />
                    <div className="relative z-10 text-center px-8">
                      <p className="text-teal-300 font-semibold text-sm">AI visualization coming soon</p>
                      <p className="text-slate-400 text-xs mt-1">
                        Preview based on: {project} · {style ?? "any style"} · ${budget.toLocaleString()} budget
                      </p>
                    </div>
                    <div className="absolute top-3 right-3 bg-teal-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                      AFTER
                    </div>
                  </div>

                  {/* Before side (clipped) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src={displayBefore}
                      alt="Before"
                      className="absolute inset-0 h-full object-cover"
                      style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: "none" }}
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-bold px-2 py-0.5 rounded">
                      BEFORE
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white/80 pointer-events-none"
                    style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <GripVertical className="h-4 w-4 text-slate-600" />
                    </div>
                  </div>
                </div>

                {/* ROI card */}
                {roi && (
                  <div className="p-5 border-t border-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-5 w-5 text-teal-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">
                          Estimated ROI: <span className="text-teal-400">{roi.amount} home value</span>
                        </p>
                        <p className="text-slate-400 text-sm mt-0.5">
                          {project} typically returns {roi.pct} of project cost at resale. Budget:{" "}
                          ${budget.toLocaleString()}.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="p-5 pt-0">
                  <Link
                    href={`/trustypro/book?project=${encodeURIComponent(project ?? "")}`}
                  >
                    <Button className="w-full bg-teal-600 hover:bg-teal-500 text-white">
                      Get Pro Quote for This
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </HomeownerLayout>
  );
}
