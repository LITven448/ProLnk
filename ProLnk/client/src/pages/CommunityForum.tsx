import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, Pin, Search, Plus, TrendingUp, Clock, Award, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { Link } from "wouter";

const CATEGORIES = [
  { id: "wins", label: "Partner Wins", icon: "🏆", color: "text-amber-400" },
  { id: "tips", label: "Tips & Tricks", icon: "💡", color: "text-blue-400" },
  { id: "questions", label: "Questions", icon: "❓", color: "text-violet-400" },
  { id: "tools", label: "Tools & Tech", icon: "🔧", color: "text-green-400" },
  { id: "general", label: "General", icon: "💬", color: "text-slate-400" },
];

const TIER_COLORS: Record<string, string> = {
  Starter: "bg-gray-500/20 text-gray-400",
  Silver: "bg-slate-400/20 text-slate-300",
  Gold: "bg-amber-500/20 text-amber-400",
  Platinum: "bg-violet-500/20 text-violet-400",
};

function timeAgo(ts: Date | string | number) {
  const diff = Date.now() - new Date(ts).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function CommunityForum() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const utils = trpc.useUtils();
  const { data: posts = [], isLoading } = trpc.forum.getPosts.useQuery(
    { category: activeCategory ?? undefined },
    { refetchInterval: 30000 }
  );

  const createPostMutation = trpc.forum.createPost.useMutation({
    onSuccess: () => {
      toast.success("Post published!");
      utils.forum.getPosts.invalidate();
      setShowNewPost(false);
      setNewTitle("");
      setNewBody("");
    },
    onError: (err) => toast.error(err.message),
  });

  const likeMutation = trpc.forum.likePost.useMutation({
    onSuccess: () => utils.forum.getPosts.invalidate(),
    onError: () => toast.error("Could not like post"),
  });

  const filtered = posts.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.body.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleLike = (id: number) => {
    if (!user) { toast.error("Sign in to like posts"); return; }
    if (likedPosts.has(id)) return;
    setLikedPosts(prev => new Set(Array.from(prev).concat(id)));
    likeMutation.mutate({ postId: id });
  };

  const handlePost = () => {
    if (!newTitle.trim() || !newBody.trim()) { toast.error("Title and body are required"); return; }
    createPostMutation.mutate({ category: newCategory, title: newTitle.trim(), body: newBody.trim() });
  };

  return (

    <PartnerLayout>

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1">← Dashboard</Link>
            <h1 className="text-3xl font-bold text-white mt-2">Partner Community</h1>
            <p className="text-slate-400 text-sm mt-1">Share wins, ask questions, and learn from the network</p>
          </div>
          {user && (
            <Button onClick={() => setShowNewPost(true)} className="bg-violet-600 hover:bg-violet-700">
              <Plus className="w-4 h-4 mr-2" /> New Post
            </Button>
          )}
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <Card className="bg-slate-800/80 border-violet-500/50 mb-6">
            <CardHeader><CardTitle className="text-white">Create a Post</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setNewCategory(c.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      newCategory === c.id ? "bg-violet-600 text-white border-violet-500" : "bg-slate-700 text-slate-300 border-slate-600"
                    }`}
                  >
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
              <Input
                placeholder="Post title..."
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Textarea
                placeholder="Share your experience, tip, or question..."
                value={newBody}
                onChange={e => setNewBody(e.target.value)}
                rows={4}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handlePost}
                  disabled={createPostMutation.isPending}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  {createPostMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Submit Post
                </Button>
                <Button variant="ghost" onClick={() => setShowNewPost(false)} className="text-slate-400">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search posts..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 bg-slate-800 border-slate-700 text-white"
              />
            </div>

            {/* Categories */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-4 space-y-1">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    !activeCategory ? "bg-violet-600/20 text-violet-300" : "text-slate-400 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  All Posts
                </button>
                {CATEGORIES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.id === activeCategory ? null : c.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                      activeCategory === c.id ? "bg-violet-600/20 text-violet-300" : "text-slate-400 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    <span>{c.icon}</span> {c.label}
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span>{posts.length} posts</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span>{posts.reduce((s, p) => s + Number(p.replyCount || 0), 0)} total replies</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{posts.reduce((s, p) => s + Number(p.likes || 0), 0)} total likes</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Posts */}
          <div className="lg:col-span-3 space-y-4">
            {isLoading && (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
              </div>
            )}

            {!isLoading && filtered.map(post => (
              <Card key={post.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all cursor-pointer">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {post.pinned ? <Pin className="w-3 h-3 text-amber-400" /> : null}
                        <Badge className={`text-xs ${CATEGORIES.find(c => c.id === post.category)?.color || ""} bg-transparent border-current`}>
                          {CATEGORIES.find(c => c.id === post.category)?.icon} {CATEGORIES.find(c => c.id === post.category)?.label}
                        </Badge>
                        {post.authorTier && (
                          <Badge className={`text-xs ${TIER_COLORS[post.authorTier] || ""}`}>{post.authorTier}</Badge>
                        )}
                      </div>
                      <h3 className="text-white font-semibold text-base leading-snug mb-2">{post.title}</h3>
                      <p className="text-slate-400 text-sm line-clamp-2">{post.body}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                        <span className="font-medium text-slate-400">{post.authorBusiness || "Partner"}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(post.createdAt)}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{Number(post.replyCount || 0)} replies</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                        likedPosts.has(post.id) ? "text-violet-400 bg-violet-500/10" : "text-slate-500 hover:text-white hover:bg-slate-700"
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs">{Number(post.likes || 0) + (likedPosts.has(post.id) ? 0 : 0)}</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {!isLoading && filtered.length === 0 && (
              <div className="text-center py-16 text-slate-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="mb-4">No posts yet. Be the first to share!</p>
                {user && (
                  <Button onClick={() => setShowNewPost(true)} className="bg-violet-600 hover:bg-violet-700">
                    <Plus className="w-4 h-4 mr-2" /> Create First Post
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    </PartnerLayout>

  );
}
