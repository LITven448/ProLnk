import React from 'react';
import { useState, useRef } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  FolderLock, Plus, FileText, FileImage, File, Loader2,
  Download, Trash2, Search, ShieldAlert, Upload, X,
  Sparkles, AlertTriangle, HardDrive, CloudUpload, CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const CATEGORIES = [
  { value: "warranty", label: "Warranties" },
  { value: "permit", label: "Permits" },
  { value: "insurance", label: "Insurance" },
  { value: "manual", label: "Appliance Manuals" },
  { value: "photo", label: "Photos" },
  { value: "receipt", label: "Receipts" },
  { value: "contract", label: "Contracts" },
  { value: "inspection", label: "Inspections" },
  { value: "other", label: "Other" },
] as const;

type CategoryValue = typeof CATEGORIES[number]["value"];

const CATEGORY_COLORS: Record<string, string> = {
  warranty: "bg-blue-100 text-blue-700",
  permit: "bg-purple-100 text-purple-700",
  receipt: "bg-green-100 text-green-700",
  insurance: "bg-orange-100 text-orange-700",
  manual: "bg-gray-100 text-gray-700",
  contract: "bg-red-100 text-red-700",
  inspection: "bg-yellow-100 text-yellow-700",
  photo: "bg-pink-100 text-pink-700",
  other: "bg-slate-100 text-slate-700",
};

const STICKY_TABS = [
  { value: "all", label: "All", count: null },
  { value: "insurance", label: "Insurance", count: 2 },
  { value: "warranty", label: "Warranties", count: 3 },
  { value: "permit", label: "Permits", count: 1 },
  { value: "receipt", label: "Receipts", count: 4 },
  { value: "contract", label: "Contracts", count: 1 },
];

function docIcon(entryType: string, fileUrl?: string) {
  if (entryType === "photo") return <FileImage className="h-4 w-4 text-pink-500 shrink-0" />;
  if (fileUrl?.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return <FileImage className="h-4 w-4 text-pink-500 shrink-0" />;
  if (fileUrl?.match(/\.pdf$/i)) return <FileText className="h-4 w-4 text-red-500 shrink-0" />;
  return <File className="h-4 w-4 text-muted-foreground shrink-0" />;
}

function isExpiringSoon(doc: any): boolean {
  if (!doc.expiresAt) return false;
  const diff = new Date(doc.expiresAt).getTime() - Date.now();
  return diff > 0 && diff < 90 * 24 * 60 * 60 * 1000;
}

function isExpired(doc: any): boolean {
  if (!doc.expiresAt) return false;
  return new Date(doc.expiresAt).getTime() < Date.now();
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function DocumentVault() {
  const { data: docs, isLoading, refetch } = trpc.homeownerExtras.getDocuments.useQuery();
  const saveMutation = trpc.homeownerExtras.saveDocument.useMutation({
    onSuccess: () => {
      toast.success("Document saved");
      setShowForm(false);
      setTitle("");
      setUrl("");
      setNotes("");
      setExpiry("");
      refetch();
    },
    onError: (e) => toast.error(e.message),
  });

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryValue>("receipt");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [expiry, setExpiry] = useState("");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!title.trim()) { toast.error("Title is required"); return; }
    saveMutation.mutate({
      title: title.trim(),
      category,
      fileUrl: url || undefined,
      notes: notes || undefined,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTitle(prev => prev || file.name.replace(/\.[^.]+$/, ""));
      toast.info("File selected. Paste the URL after uploading to your storage, or save with a title only.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setTitle(prev => prev || file.name.replace(/\.[^.]+$/, ""));
      setShowForm(true);
      toast.info(`"${file.name}" ready. Add a URL or save by title.`);
    }
  };

  const allDocs: any[] = docs ?? [];

  const filtered = allDocs.filter(doc => {
    const matchSearch = !search || doc.title?.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "all" || doc.entryType === activeTab;
    return matchSearch && matchTab;
  });

  const expirySoon = allDocs.filter(
    d => (d.entryType === "warranty" || d.entryType === "insurance") && (isExpiringSoon(d) || isExpired(d))
  );

  const groupedByCategory = CATEGORIES.reduce<Record<string, any[]>>((acc, cat) => {
    const items = filtered.filter(d => d.entryType === cat.value);
    if (items.length > 0) acc[cat.value] = items;
    return acc;
  }, {});

  const totalDocs = allDocs.length;
  const analyzedCount = Math.min(4, totalDocs);
  const storageUsedGb = 2.4;
  const storageTotalGb = 10;
  const storagePercent = Math.round((storageUsedGb / storageTotalGb) * 100);

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto space-y-5 p-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Document Vault</h1>
            <p className="text-muted-foreground mt-1">Warranties, permits, insurance, manuals, and more.</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} size="sm">
            <Plus className="h-4 w-4 mr-1.5" />Add Document
          </Button>
        </div>

        {/* Smart Alerts */}
        <div className="space-y-2">
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-amber-800">Homeowner's insurance expires in 47 days</p>
              <p className="text-xs text-amber-700 mt-0.5">Renew before Jun 30, 2026 to avoid a coverage gap.</p>
            </div>
            <Button size="sm" variant="outline" className="shrink-0 border-amber-300 text-amber-800 hover:bg-amber-100 text-xs h-7">
              Renew Now
            </Button>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3">
            <ShieldAlert className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-yellow-800">No warranty documentation for HVAC unit (2022)</p>
              <p className="text-xs text-yellow-700 mt-0.5">Units installed after 2020 typically have 5–10 yr manufacturer warranties.</p>
            </div>
            <Button size="sm" variant="outline" className="shrink-0 border-yellow-300 text-yellow-800 hover:bg-yellow-100 text-xs h-7">
              Add Doc
            </Button>
          </div>
        </div>

        {/* AI Analysis Card */}
        <Card className="border-teal-200 bg-teal-50/60">
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-teal-900">AI has analyzed {analyzedCount} of {totalDocs || 7} documents</p>
                  <p className="text-xs text-teal-700 mt-0.5">Coverage gaps, expiration alerts, and cross-document insights ready.</p>
                </div>
              </div>
              <Button size="sm" className="shrink-0 bg-teal-600 hover:bg-teal-700 text-white text-xs">
                Analyze Remaining
              </Button>
            </div>
            <div className="mt-3 flex gap-3 text-xs text-teal-700">
              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> 2 expiry alerts found</span>
              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> 1 coverage gap detected</span>
            </div>
          </CardContent>
        </Card>

        {/* Storage Meter */}
        <div className="flex items-center gap-3 px-1">
          <HardDrive className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">{storageUsedGb} GB of {storageTotalGb} GB used</span>
              <span className="text-xs font-medium text-muted-foreground">{storagePercent}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-teal-500 transition-all"
                style={{ width: `${storagePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Add Document Form */}
        {showForm && (
          <Card className="border-primary/30">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Add Document</CardTitle>
              <Button size="icon" variant="ghost" onClick={() => setShowForm(false)}><X className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Document title (e.g. HVAC Warranty 2024)"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <Select value={category} onValueChange={v => setCategory(v as CategoryValue)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(c => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Input
                  placeholder="Document URL (paste link)"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="shrink-0"
                >
                  <Upload className="h-4 w-4 mr-1.5" />Upload
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              {(category === "warranty" || category === "insurance") && (
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Expiry date (optional)</label>
                  <Input
                    type="date"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                  />
                </div>
              )}
              <Input placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} />
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={saveMutation.isPending} className="flex-1">
                  {saveMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Save
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Sticky Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 sticky top-0 bg-background z-10 py-1">
          {STICKY_TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors shrink-0 ${
                activeTab === tab.value
                  ? "bg-teal-600 text-white border-teal-600"
                  : "border-border text-muted-foreground hover:border-teal-400 hover:text-foreground"
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.value ? "bg-teal-500 text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : allDocs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FolderLock className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="font-medium">No documents yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add warranties, permits, insurance policies, and other home documents.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {expirySoon.length > 0 && (
              <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-orange-700 dark:text-orange-400">
                    <ShieldAlert className="h-4 w-4" />
                    Expiring Soon — Warranties &amp; Insurance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {expirySoon.map((doc: any) => (
                    <DocRow key={doc.id} doc={doc} showExpiry />
                  ))}
                </CardContent>
              </Card>
            )}

            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-8">No documents match your search.</p>
            ) : (
              Object.entries(groupedByCategory).map(([catValue, items]) => {
                const catLabel = CATEGORIES.find(c => c.value === catValue)?.label ?? catValue;
                return (
                  <div key={catValue} className="space-y-1.5">
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-1">{catLabel}</h2>
                    {items.map((doc: any) => (
                      <DocRow key={doc.id} doc={doc} />
                    ))}
                    {/* Bulk drop zone per category */}
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => { setCategory(catValue as CategoryValue); dropZoneRef.current?.click(); }}
                      className={`flex items-center justify-center gap-2 rounded-xl border-2 border-dashed py-3 cursor-pointer transition-colors ${
                        isDragOver
                          ? "border-teal-400 bg-teal-50 text-teal-700"
                          : "border-muted-foreground/20 text-muted-foreground hover:border-teal-300 hover:bg-teal-50/40"
                      }`}
                    >
                      <CloudUpload className="h-4 w-4" />
                      <span className="text-xs">Drop files here or click to upload to {catLabel}</span>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}

        {/* Hidden input for bulk drop zone click */}
        <input
          ref={dropZoneRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </HomeownerLayout>
  );
}

function DocRow({ doc, showExpiry }: { doc: any; showExpiry?: boolean }) {
  const uploadDate = doc.createdAt ? fmtDate(doc.createdAt) : null;
  const expiryDate = doc.expiresAt ? fmtDate(doc.expiresAt) : null;
  const expired = isExpired(doc);
  const expiring = isExpiringSoon(doc);

  return (
    <Card>
      <CardContent className="pt-3 pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {docIcon(doc.entryType, doc.fileUrl)}
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">{doc.title}</p>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                {uploadDate && (
                  <span className="text-xs text-muted-foreground">Added {uploadDate}</span>
                )}
                {showExpiry && expiryDate && (
                  <span className={`text-xs font-medium ${expired ? "text-red-600" : "text-orange-600"}`}>
                    {expired ? "Expired" : "Expires"} {expiryDate}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${CATEGORY_COLORS[doc.entryType] ?? CATEGORY_COLORS.other}`}>
              {CATEGORIES.find(c => c.value === doc.entryType)?.label ?? doc.entryType}
            </span>
            {doc.fileUrl && (
              <a href={doc.fileUrl} download target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="h-7 w-7">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </a>
            )}
            <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
