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
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const allDocs: any[] = docs ?? [];

  const filtered = allDocs.filter(doc => {
    const matchSearch = !search || doc.title?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "all" || doc.entryType === filterCategory;
    return matchSearch && matchCat;
  });

  const expirySoon = allDocs.filter(
    d => (d.entryType === "warranty" || d.entryType === "insurance") && (isExpiringSoon(d) || isExpired(d))
  );

  const groupedByCategory = CATEGORIES.reduce<Record<string, any[]>>((acc, cat) => {
    const items = filtered.filter(d => d.entryType === cat.value);
    if (items.length > 0) acc[cat.value] = items;
    return acc;
  }, {});

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto space-y-6 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Document Vault</h1>
            <p className="text-muted-foreground mt-1">Warranties, permits, insurance, manuals, and more.</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} size="sm">
            <Plus className="h-4 w-4 mr-1.5" />Add Document
          </Button>
        </div>

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

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40 shrink-0"><SelectValue placeholder="All categories" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORIES.map(c => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                  </div>
                );
              })
            )}
          </>
        )}
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

