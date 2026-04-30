/**
 * AdminPartnerContent.tsx
 * Admin UI to manage partner-facing content:
 * - Announcements (shown in WhatsNew)
 * - Upsell tips (shown in UpsellPlaybook)
 * - Resource links (shown in ResourceCenter)
 * - Training modules (shown in TrainingHub)
 */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { FileText, Plus, Edit, Trash2, Eye, EyeOff, Search, Save, X, Megaphone, BookOpen, Link, Lightbulb } from "lucide-react";
import { toast } from "sonner";

const CONTENT_TYPE_LABELS: Record<string, string> = {
  announcement: "Announcement",
  playbook_tip: "Upsell Tip",
  training_module: "Training Module",
  resource_link: "Resource Link",
};

const CONTENT_TYPE_ICONS: Record<string, React.ElementType> = {
  announcement: Megaphone,
  playbook_tip: Lightbulb,
  training_module: BookOpen,
  resource_link: Link,
};

const CONTENT_TYPE_COLORS: Record<string, string> = {
  announcement: "bg-blue-100 text-blue-800 border-blue-200",
  playbook_tip: "bg-green-100 text-green-800 border-green-200",
  training_module: "bg-purple-100 text-purple-800 border-purple-200",
  resource_link: "bg-orange-100 text-orange-800 border-orange-200",
};

type ContentType = "announcement" | "playbook_tip" | "training_module" | "resource_link";

interface ItemForm {
  contentType: ContentType;
  title: string;
  body: string;
  url: string;
  category: string;
}

const EMPTY_FORM: ItemForm = {
  contentType: "announcement",
  title: "",
  body: "",
  url: "",
  category: "",
};

export default function AdminPartnerContent() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState<ItemForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<ItemForm>>({});

  const utils = trpc.useUtils();

  const { data: items = [], isLoading } = trpc.partnerTools.content.adminList.useQuery(
    { contentType: filterType !== "all" ? (filterType as ContentType) : undefined }
  );

  const createMutation = trpc.partnerTools.content.create.useMutation({
    onSuccess: () => {
      toast.success("Content item created as draft");
      setShowNew(false);
      setNewForm(EMPTY_FORM);
      utils.partnerTools.content.adminList.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const updateMutation = trpc.partnerTools.content.update.useMutation({
    onSuccess: () => {
      toast.success("Saved");
      setEditingId(null);
      utils.partnerTools.content.adminList.invalidate();
      utils.partnerTools.content.list.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = trpc.partnerTools.content.delete.useMutation({
    onSuccess: () => {
      toast.success("Deleted");
      utils.partnerTools.content.adminList.invalidate();
      utils.partnerTools.content.list.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    (item.body ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const publishedCount = items.filter(i => i.isPublished).length;
  const draftCount = items.filter(i => !i.isPublished).length;

  const startEdit = (item: typeof items[0]) => {
    setEditingId(item.id);
    setEditForm({
      title: item.title,
      body: item.body ?? "",
      url: item.url ?? "",
      category: item.category ?? "",
      contentType: item.contentType as ContentType,
    });
  };

  const saveEdit = () => {
    if (!editingId || !editForm.title?.trim()) return;
    updateMutation.mutate({ id: editingId, ...editForm });
  };

  const togglePublish = (item: typeof items[0]) => {
    updateMutation.mutate({
      id: item.id,
      isPublished: !item.isPublished,
    });
    toast.success(item.isPublished ? "Unpublished — partners will no longer see this" : "Published — partners can now see this");
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">Partner Content</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage announcements, upsell tips, training modules, and resource links shown to partners.
            </p>
          </div>
          <Button onClick={() => setShowNew(true)} className="gap-2">
            <Plus className="w-4 h-4" /> New Item
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Items", value: items.length, icon: FileText, color: "text-slate-500" },
            { label: "Published", value: publishedCount, icon: Eye, color: "text-green-500" },
            { label: "Drafts", value: draftCount, icon: EyeOff, color: "text-amber-500" },
            { label: "Content Types", value: 4, icon: Megaphone, color: "text-blue-500" },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className={`w-8 h-8 ${color}`} />
                <div>
                  <div className="text-2xl font-bold">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Item Form */}
        {showNew && (
          <Card className="border-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                Create New Content Item
                <Button variant="ghost" size="icon" onClick={() => setShowNew(false)}><X className="w-4 h-4" /></Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium mb-1 block">Type *</label>
                  <Select value={newForm.contentType} onValueChange={v => setNewForm(f => ({ ...f, contentType: v as ContentType }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(CONTENT_TYPE_LABELS).map(([v, l]) => (
                        <SelectItem key={v} value={v}>{l}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Category (optional)</label>
                  <Input placeholder="e.g. HVAC, Roofing, General" value={newForm.category} onChange={e => setNewForm(f => ({ ...f, category: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Title *</label>
                <Input placeholder="Title shown to partners" value={newForm.title} onChange={e => setNewForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Body</label>
                <Textarea placeholder="Content body..." value={newForm.body} onChange={e => setNewForm(f => ({ ...f, body: e.target.value }))} rows={3} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">URL (optional — for resource links)</label>
                <Input placeholder="https://..." value={newForm.url} onChange={e => setNewForm(f => ({ ...f, url: e.target.value }))} />
              </div>
              <div className="flex gap-2 pt-1">
                <Button
                  onClick={() => createMutation.mutate(newForm)}
                  disabled={!newForm.title.trim() || createMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-1" />
                  {createMutation.isPending ? "Saving..." : "Save as Draft"}
                </Button>
                <Button variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex gap-3 items-center flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search content..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48"><SelectValue placeholder="All types" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(CONTENT_TYPE_LABELS).map(([v, l]) => (
                <SelectItem key={v} value={v}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Content List */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading content...</div>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No content items yet</p>
              <p className="text-sm mt-1">Click "New Item" to create your first announcement, tip, or resource.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map(item => {
              const TypeIcon = CONTENT_TYPE_ICONS[item.contentType] ?? FileText;
              return (
                <Card key={item.id} className={editingId === item.id ? "border-primary" : ""}>
                  <CardContent className="p-4">
                    {editingId === item.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium mb-1 block">Type</label>
                            <Select value={editForm.contentType} onValueChange={v => setEditForm(f => ({ ...f, contentType: v as ContentType }))}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {Object.entries(CONTENT_TYPE_LABELS).map(([v, l]) => (
                                  <SelectItem key={v} value={v}>{l}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-xs font-medium mb-1 block">Category</label>
                            <Input value={editForm.category ?? ""} onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))} />
                          </div>
                        </div>
                        <Input value={editForm.title ?? ""} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" />
                        <Textarea value={editForm.body ?? ""} onChange={e => setEditForm(f => ({ ...f, body: e.target.value }))} rows={3} placeholder="Body" />
                        <Input value={editForm.url ?? ""} onChange={e => setEditForm(f => ({ ...f, url: e.target.value }))} placeholder="URL (optional)" />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={saveEdit} disabled={updateMutation.isPending}>
                            <Save className="w-3 h-3 mr-1" /> {updateMutation.isPending ? "Saving..." : "Save"}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className={`p-2 rounded-lg border ${CONTENT_TYPE_COLORS[item.contentType]} shrink-0`}>
                            <TypeIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-xs font-medium text-muted-foreground">
                                {CONTENT_TYPE_LABELS[item.contentType]}
                              </span>
                              {item.category && <span className="text-xs text-muted-foreground">· {item.category}</span>}
                              <Badge variant={item.isPublished ? "default" : "secondary"} className="text-xs">
                                {item.isPublished ? "Published" : "Draft"}
                              </Badge>
                            </div>
                            <p className="font-medium truncate">{item.title}</p>
                            {item.body && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.body}</p>}
                            {item.url && (
                              <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline mt-1 block truncate">
                                {item.url}
                              </a>
                            )}
                            <p className="text-xs text-muted-foreground mt-2">
                              Created {new Date(item.createdAt).toLocaleDateString()}
                              {item.publishedAt && ` · Published ${new Date(item.publishedAt).toLocaleDateString()}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            size="sm"
                            variant={item.isPublished ? "outline" : "default"}
                            onClick={() => togglePublish(item)}
                            disabled={updateMutation.isPending}
                            className="gap-1"
                          >
                            {item.isPublished ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            {item.isPublished ? "Unpublish" : "Publish"}
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => startEdit(item)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              if (confirm("Delete this content item? This cannot be undone.")) {
                                deleteMutation.mutate({ id: item.id });
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
