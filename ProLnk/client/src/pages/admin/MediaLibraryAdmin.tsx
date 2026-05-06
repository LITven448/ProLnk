import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Image, Search, Trash2, Eye, Tag, HardDrive, Camera, Sparkles, FileImage, Film, Upload, BarChart3, Grid3X3, List } from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  job_photo: "Job Photo",
  before_after: "Before/After",
  profile: "Profile",
  property: "Property",
  document: "Document",
  marketing: "Marketing",
  ai_generated: "AI Generated",
};

const CATEGORY_COLORS: Record<string, string> = {
  job_photo: "bg-blue-500/20 text-blue-400",
  before_after: "bg-purple-500/20 text-purple-400",
  profile: "bg-green-500/20 text-green-400",
  property: "bg-amber-500/20 text-amber-400",
  document: "bg-slate-500/20 text-slate-400",
  marketing: "bg-pink-500/20 text-pink-400",
  ai_generated: "bg-teal-500/20 text-teal-400",
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export default function MediaLibraryAdmin() {

  const [category, setCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const itemsQuery = trpc.mediaLibrary.getItems.useQuery({
    category: category !== "all" ? category as any : undefined,
    limit: 100,
    offset: 0,
  });
  const statsQuery = trpc.mediaLibrary.getStats.useQuery();
  const searchResults = trpc.mediaLibrary.searchByTags.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length > 2 }
  );
  const deleteMutation = trpc.mediaLibrary.deleteItem.useMutation({
    onSuccess: () => {
      toast.success("Item deleted");
      itemsQuery.refetch();
      statsQuery.refetch();
    },
  });

  const items = searchQuery.length > 2 ? (searchResults.data || []) : (itemsQuery.data || []);
  const stats = statsQuery.data;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Image className="h-6 w-6 text-purple-400" />
              Media Library
            </h1>
            <p className="text-slate-400 mt-1">Manage all photos, documents, and AI-generated content</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileImage className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-400">Total Files</span>
              </div>
              <div className="text-2xl font-bold text-white mt-1">{stats?.total || 0}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-400">Storage Used</span>
              </div>
              <div className="text-2xl font-bold text-white mt-1">{formatBytes(stats?.totalSizeBytes || 0)}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-slate-400">Job Photos</span>
              </div>
              <div className="text-2xl font-bold text-blue-400 mt-1">{stats?.jobPhotos || 0}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-teal-400" />
                <span className="text-sm text-slate-400">AI Generated</span>
              </div>
              <div className="text-2xl font-bold text-teal-400 mt-1">{stats?.aiGenerated || 0}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-slate-400">AI Analyzed</span>
              </div>
              <div className="text-2xl font-bold text-amber-400 mt-1">{stats?.aiAnalyzed || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white"
              placeholder="Search by tags..."
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              className={viewMode === "grid" ? "bg-slate-700 text-white" : "text-slate-400"}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={viewMode === "list" ? "bg-slate-700 text-white" : "text-slate-400"}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-12 text-center">
              <Image className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No media files yet</h3>
              <p className="text-slate-400">Media files will appear here as partners and homeowners upload photos and documents.</p>
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-4 gap-4">
            {items.map((item) => (
              <Card key={item.id} className="bg-slate-800/60 border-slate-700 overflow-hidden group">
                <div className="aspect-square bg-slate-900 relative">
                  {item.mimeType?.startsWith("image/") ? (
                    <img src={item.fileUrl} alt={item.fileName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileImage className="h-12 w-12 text-slate-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-400 hover:bg-red-500/20"
                      onClick={() => deleteMutation.mutate({ id: item.id })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm text-white truncate">{item.fileName}</p>
                  <div className="flex items-center justify-between mt-1">
                    <Badge className={CATEGORY_COLORS[item.category || "document"] + " text-xs"}>
                      {CATEGORY_LABELS[item.category || "document"]}
                    </Badge>
                    <span className="text-xs text-slate-500">{formatBytes(item.fileSizeBytes || 0)}</span>
                  </div>
                  {item.aiAnalyzed && (
                    <div className="flex items-center gap-1 mt-1">
                      <Sparkles className="h-3 w-3 text-teal-400" />
                      <span className="text-xs text-teal-400">AI Analyzed</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <Card key={item.id} className="bg-slate-800/60 border-slate-700">
                <CardContent className="p-3 flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-slate-900 flex-shrink-0 overflow-hidden">
                    {item.mimeType?.startsWith("image/") ? (
                      <img src={item.fileUrl} alt={item.fileName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileImage className="h-6 w-6 text-slate-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{item.fileName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={CATEGORY_COLORS[item.category || "document"] + " text-xs"}>
                        {CATEGORY_LABELS[item.category || "document"]}
                      </Badge>
                      <span className="text-xs text-slate-500">{formatBytes(item.fileSizeBytes || 0)}</span>
                      {item.aiAnalyzed && (
                        <span className="flex items-center gap-1 text-xs text-teal-400">
                          <Sparkles className="h-3 w-3" /> Analyzed
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-400 hover:bg-red-500/10"
                    onClick={() => deleteMutation.mutate({ id: item.id })}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
