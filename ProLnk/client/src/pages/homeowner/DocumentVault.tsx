import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderLock, Plus, FileText, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const CATEGORIES = ["warranty", "permit", "receipt", "insurance", "manual", "contract", "inspection", "photo", "other"] as const;
const CATEGORY_COLORS: Record<string, string> = {
  warranty: "bg-blue-100 text-blue-700", permit: "bg-purple-100 text-purple-700",
  receipt: "bg-green-100 text-green-700", insurance: "bg-orange-100 text-orange-700",
  manual: "bg-gray-100 text-gray-700", contract: "bg-red-100 text-red-700",
  inspection: "bg-yellow-100 text-yellow-700", photo: "bg-pink-100 text-pink-700",
  other: "bg-slate-100 text-slate-700",
};

export default function DocumentVault() {
  const { data: docs, isLoading, refetch } = trpc.homeownerExtras.getDocuments.useQuery();
  const saveMutation = trpc.homeownerExtras.saveDocument.useMutation({
    onSuccess: () => { toast.success("Document saved"); setShowForm(false); setTitle(""); setUrl(""); refetch(); },
    onError: (e) => toast.error(e.message),
  });

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<typeof CATEGORIES[number]>("receipt");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (!title.trim()) { toast.error("Title is required"); return; }
    saveMutation.mutate({ title: title.trim(), category, fileUrl: url || undefined, notes: notes || undefined });
  };

  return (
    <HomeownerLayout>
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Document Vault</h1>
          <p className="text-muted-foreground mt-1">Store warranties, permits, receipts, and home documents.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          <Plus className="h-4 w-4 mr-1.5" />Add Document
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/30">
          <CardHeader className="pb-2"><CardTitle className="text-base">Add Document</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Document title (e.g. HVAC Warranty 2024)" value={title} onChange={e => setTitle(e.target.value)} />
            <Select value={category} onValueChange={v => setCategory(v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="Document URL (optional)" value={url} onChange={e => setUrl(e.target.value)} />
            <Input placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} />
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saveMutation.isPending} className="flex-1">
                {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Save
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
      ) : (docs ?? []).length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderLock className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No documents yet</p>
            <p className="text-sm text-muted-foreground mt-1">Add warranties, permits, receipts, and other home documents.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {(docs ?? []).map((doc: any) => (
            <Card key={doc.id}>
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{doc.title}</p>
                      {doc.description && <p className="text-xs text-muted-foreground truncate">{doc.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={"text-xs px-2 py-0.5 rounded-full capitalize " + (CATEGORY_COLORS[doc.entryType] ?? CATEGORY_COLORS.other)}>
                      {doc.entryType}
                    </span>
                    {doc.fileUrl && (
                      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="ghost"><ExternalLink className="h-3.5 w-3.5" /></Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
    </HomeownerLayout>
  );
}
