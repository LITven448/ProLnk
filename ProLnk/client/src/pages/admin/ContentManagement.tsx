import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/AdminLayout";
import { FileText, Plus, Edit, Eye, TrendingUp, Search, Globe, Calendar, X } from "lucide-react";
import { toast } from "sonner";

const POSTS = [
  { id: 1, title: "How to Choose a Roofing Contractor After a Storm", status: "published", views: 3420, seoScore: 87, keyword: "storm damage roofing", date: "Mar 15, 2026", category: "Homeowner Guide" },
  { id: 2, title: "What Does Homeowners Insurance Actually Cover?", status: "published", views: 2180, seoScore: 91, keyword: "homeowners insurance coverage", date: "Mar 8, 2026", category: "Insurance" },
  { id: 3, title: "5 Signs Your HVAC Needs Replacing (Not Just Repairing)", status: "published", views: 1890, seoScore: 82, keyword: "HVAC replacement signs", date: "Feb 28, 2026", category: "Homeowner Guide" },
  { id: 4, title: "ProLnk Partner Program: How It Works", status: "published", views: 1240, seoScore: 79, keyword: "home services partner program", date: "Feb 15, 2026", category: "Partner" },
  { id: 5, title: "Spring Home Maintenance Checklist 2026", status: "draft", views: 0, seoScore: 65, keyword: "spring home maintenance", date: "Apr 3, 2026", category: "Homeowner Guide" },
  { id: 6, title: "How Much Does a Roof Replacement Cost in DFW?", status: "draft", views: 0, seoScore: 72, keyword: "roof replacement cost Dallas", date: "Apr 5, 2026", category: "Cost Guide" },
];

const SEO_OPPORTUNITIES = [
  { keyword: "roof repair near me", volume: "12,000/mo", difficulty: "Medium", currentRank: "Not ranking" },
  { keyword: "best roofing contractor Dallas", volume: "8,400/mo", difficulty: "High", currentRank: "Page 3" },
  { keyword: "home warranty vs homeowners insurance", volume: "6,200/mo", difficulty: "Low", currentRank: "Not ranking" },
  { keyword: "how to file a roof insurance claim", volume: "4,800/mo", difficulty: "Low", currentRank: "Page 2" },
];

export default function ContentManagement() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState(POSTS);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  const published = posts.filter(p => p.status === "published").length;
  const totalViews = posts.reduce((s, p) => s + p.views, 0);

  const startEdit = (post: typeof POSTS[0]) => { setEditingId(post.id); setEditTitle(post.title); };
  const saveEdit = (id: number) => {
    if (!editTitle.trim()) return;
    setPosts(prev => prev.map(p => p.id === id ? { ...p, title: editTitle } : p));
    setEditingId(null);
    toast.success("Post updated");
  };
  const createPost = () => {
    if (!newTitle.trim()) { toast.error("Enter a post title"); return; }
    const newPost = { id: Date.now(), title: newTitle, status: "draft", views: 0, seoScore: 60, keyword: newKeyword || "(none)", date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), category: newCategory || "General" };
    setPosts(prev => [newPost, ...prev]);
    setShowNew(false); setNewTitle(""); setNewCategory(""); setNewKeyword("");
    toast.success("Draft created!");
  };
  const publishPost = (id: number) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: "published", date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) } : p));
    toast.success("Post published!");
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Content Management</h1>
            <p className="text-muted-foreground text-sm mt-1">Blog posts, SEO pages, and organic traffic</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setShowNew(!showNew)}>
            <Plus className="w-4 h-4 mr-2" /> New Post
          </Button>
        </div>

        {/* New Post Form */}
        {showNew && (
          <div className="mb-5 p-4 bg-card border rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">New Blog Post</h3>
              <Button size="sm" variant="ghost" onClick={() => setShowNew(false)}><X className="w-4 h-4" /></Button>
            </div>
            <Input placeholder="Post title *" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Category (e.g. Homeowner Guide)" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
              <Input placeholder="Target keyword" value={newKeyword} onChange={e => setNewKeyword(e.target.value)} />
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-sm" onClick={createPost}><Plus className="w-4 h-4 mr-2" /> Create Draft</Button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card><CardContent className="pt-4"><div className="text-xs text-muted-foreground mb-1">Published</div><div className="text-2xl font-bold">{published}</div></CardContent></Card>
          <Card><CardContent className="pt-4"><div className="text-xs text-muted-foreground mb-1">Drafts</div><div className="text-2xl font-bold">{posts.length - published}</div></CardContent></Card>
          <Card><CardContent className="pt-4"><div className="text-xs text-muted-foreground mb-1">Total Views</div><div className="text-2xl font-bold">{totalViews.toLocaleString()}</div></CardContent></Card>
          <Card><CardContent className="pt-4"><div className="text-xs text-muted-foreground mb-1">Avg SEO Score</div><div className="text-2xl font-bold">{Math.round(POSTS.reduce((s, p) => s + p.seoScore, 0) / POSTS.length)}/100</div></CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Post List */}
          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              {filtered.map(post => (
                <div key={post.id} className="flex items-center gap-3 p-3 bg-card border rounded-xl">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-sm font-medium text-foreground truncate">{post.title}</span>
                      <Badge className={`text-xs ${post.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{post.status}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3" />SEO: {post.seoScore}/100</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {editingId === post.id ? (
                      <>
                        <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="h-7 text-xs w-48" onKeyDown={e => e.key === 'Enter' && saveEdit(post.id)} />
                        <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700 h-7 px-2" onClick={() => saveEdit(post.id)}>Save</Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" className="text-xs" onClick={() => startEdit(post)}><Edit className="w-3 h-3" /></Button>
                        {post.status === "draft" && <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700 h-7 px-2" onClick={() => publishPost(post.id)}>Publish</Button>}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Opportunities */}
          <div>
            <Card>
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-500" /> SEO Opportunities</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {SEO_OPPORTUNITIES.map((opp, i) => (
                  <div key={i} className="p-2 bg-muted/30 rounded-lg">
                    <div className="text-xs font-medium text-foreground mb-1">"{opp.keyword}"</div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{opp.volume}</span>
                      <Badge className={`text-xs ${opp.difficulty === "Low" ? "bg-green-100 text-green-700" : opp.difficulty === "Medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"}`}>{opp.difficulty}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">Current: {opp.currentRank}</div>
                    <Button size="sm" className="w-full mt-2 text-xs bg-indigo-600 hover:bg-indigo-700" onClick={() => { setNewKeyword(opp.keyword); setNewTitle(`How to ${opp.keyword.charAt(0).toUpperCase() + opp.keyword.slice(1)}`); setShowNew(true); }}>
                      Create Post
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
