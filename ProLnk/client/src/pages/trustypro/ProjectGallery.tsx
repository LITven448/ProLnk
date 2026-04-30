/**
 * TrustyPro Project Gallery
 * 
 * Before/after photo grid from completed jobs, filterable by category.
 * Uses real data from trpc.gallery.getProjects, falls back to demo when empty.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Star, MapPin, X, Plus, Loader2, Upload } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

const CATEGORIES = [
  "All",
  "Roofing",
  "Landscaping",
  "Interior",
  "HVAC",
  "Plumbing",
  "Painting",
  "Flooring",
  "Electrical",
  "Fencing",
];

// Demo projects shown when gallery is empty (new network)
const DEMO_PROJECTS = [
  {
    id: -1,
    partnerId: 0,
    category: "Roofing",
    title: "Full Roof Replacement",
    description: "Complete tear-off and replacement with 30-year architectural shingles. Storm damage claim.",
    beforeImageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    completedAt: null as Date | null,
    createdAt: new Date(),
    businessName: "DFW Roofing Pros",
    tier: "Gold",
    jobValue: "$12,400",
    rating: 5.0,
    location: "Plano, TX",
  },
  {
    id: -2,
    partnerId: 0,
    category: "Landscaping",
    title: "Backyard Transformation",
    description: "Full backyard redesign with sod, irrigation system, and decorative stone border.",
    beforeImageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80",
    completedAt: null as Date | null,
    createdAt: new Date(),
    businessName: "Green Thumb DFW",
    tier: "Platinum",
    jobValue: "$8,200",
    rating: 5.0,
    location: "Frisco, TX",
  },
  {
    id: -3,
    partnerId: 0,
    category: "Interior",
    title: "Kitchen Renovation",
    description: "Complete kitchen gut renovation — new cabinets, quartz countertops, tile backsplash.",
    beforeImageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80",
    completedAt: null as Date | null,
    createdAt: new Date(),
    businessName: "Premier Remodeling TX",
    tier: "Gold",
    jobValue: "$24,000",
    rating: 4.9,
    location: "McKinney, TX",
  },
  {
    id: -4,
    partnerId: 0,
    category: "Painting",
    title: "Exterior Repaint",
    description: "Full exterior repaint with premium Sherwin-Williams Duration paint. Two coats.",
    beforeImageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    completedAt: null as Date | null,
    createdAt: new Date(),
    businessName: "Precision Painters DFW",
    tier: "Silver",
    jobValue: "$4,800",
    rating: 5.0,
    location: "Allen, TX",
  },
  {
    id: -5,
    partnerId: 0,
    category: "Flooring",
    title: "Hardwood Floor Installation",
    description: "Removed carpet in 3 bedrooms and hallway. Installed 5\" white oak engineered hardwood.",
    beforeImageUrl: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=600&q=80",
    completedAt: null as Date | null,
    createdAt: new Date(),
    businessName: "Texas Floor Masters",
    tier: "Gold",
    jobValue: "$7,600",
    rating: 5.0,
    location: "Prosper, TX",
  },
  {
    id: -6,
    partnerId: 0,
    category: "Fencing",
    title: "Cedar Privacy Fence",
    description: "Replaced rotted chain link with 6-foot cedar privacy fence, 180 linear feet.",
    beforeImageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80",
    completedAt: null as Date | null,
    createdAt: new Date(),
    businessName: "Lone Star Fencing",
    tier: "Silver",
    jobValue: "$5,200",
    rating: 4.8,
    location: "Celina, TX",
  },
];

type Project = typeof DEMO_PROJECTS[0];

function BeforeAfterCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [showAfter, setShowAfter] = useState(false);
  const img = showAfter ? project.afterImageUrl : project.beforeImageUrl;

  return (
    <div
      className="group rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {img ? (
          <img src={img} alt={showAfter ? "After" : "Before"} className="w-full h-full object-cover transition-opacity duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No photo</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-1">
          <button
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${!showAfter ? "bg-white text-gray-900" : "bg-white/40 text-white"}`}
            onClick={(e) => { e.stopPropagation(); setShowAfter(false); }}
          >
            Before
          </button>
          <button
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${showAfter ? "bg-emerald-500 text-white" : "bg-white/40 text-white"}`}
            onClick={(e) => { e.stopPropagation(); setShowAfter(true); }}
          >
            After
          </button>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 text-gray-800 text-xs border-0">{project.category}</Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{project.title}</h3>
          {project.jobValue && <span className="text-sm font-bold text-emerald-600 whitespace-nowrap">{project.jobValue}</span>}
        </div>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{project.description}</p>
        <div className="flex items-center justify-between">
          {project.location && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />{project.location}
            </div>
          )}
          {project.rating != null && (
            <div className="flex items-center gap-1 text-xs text-amber-500">
              <Star className="w-3 h-3 fill-amber-500" />{project.rating.toFixed(1)}
            </div>
          )}
        </div>
        {project.businessName && <p className="text-xs text-gray-400 mt-1">by {project.businessName}</p>}
      </div>
    </div>
  );
}

function AddProjectModal({ onClose }: { onClose: () => void }) {
  const utils = trpc.useUtils();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Roofing");
  const [beforeUrl, setBeforeUrl] = useState("");
  const [afterUrl, setAfterUrl] = useState("");

  const addMutation = trpc.gallery.addProject.useMutation({
    onSuccess: () => {
      toast.success("Project added to gallery!");
      utils.gallery.getProjects.invalidate();
      onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Project to Gallery</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Project Title</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Full Roof Replacement" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
            <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description of the work done" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Before Photo URL</label>
            <Input value={beforeUrl} onChange={e => setBeforeUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">After Photo URL</label>
            <Input value={afterUrl} onChange={e => setAfterUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => addMutation.mutate({ title, description, category, beforeImageUrl: beforeUrl || undefined, afterImageUrl: afterUrl || undefined })}
              disabled={!title || addMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700 flex-1"
            >
              {addMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Add Project
            </Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProjectGallery() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const { data: realProjects = [], isLoading } = trpc.gallery.getProjects.useQuery(
    { category: selectedCategory !== "All" ? selectedCategory : undefined },
    { refetchInterval: 60000 }
  );

  // Use real projects if any exist, otherwise show demo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sourceProjects: any[] = realProjects.length > 0 ? realProjects : DEMO_PROJECTS;

  const isDemo = realProjects.length === 0;

  const filtered = sourceProjects.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.businessName || "").toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold text-gray-900">Project Gallery</h1>
            {user && (
              <Button onClick={() => setShowAdd(true)} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-1" /> Add Project
              </Button>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Real before &amp; after photos from TrustyPro verified contractors
            {isDemo && !isLoading && <span className="ml-2 text-amber-600 font-medium">(Sample projects — be the first to add yours!)</span>}
          </p>

          <div className="relative mt-4 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by project type, contractor..."
              className="pl-9 bg-gray-50 border-gray-200"
            />
          </div>

          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">No projects found for this filter.</p>
            {user && (
              <Button onClick={() => setShowAdd(true)} className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" /> Add First Project
              </Button>
            )}
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">{filtered.length} projects</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((project) => (
                <BeforeAfterCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video bg-gray-100">
              <img
                src={selectedProject.afterImageUrl || selectedProject.beforeImageUrl || ""}
                alt="Project"
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedProject.title}</h2>
                  {selectedProject.businessName && (
                    <p className="text-sm text-gray-500 mt-1">by {selectedProject.businessName}</p>
                  )}
                </div>
                {selectedProject.jobValue && (
                  <p className="text-lg font-bold text-emerald-600">{selectedProject.jobValue}</p>
                )}
              </div>
              {selectedProject.description && (
                <p className="text-sm text-gray-600 leading-relaxed">{selectedProject.description}</p>
              )}
              <div className="mt-4 flex gap-3">
                {selectedProject.category && (
                  <Badge className="bg-gray-100 text-gray-700 border-0">{selectedProject.category}</Badge>
                )}
                <Badge className="bg-emerald-50 text-emerald-700 border-0">TrustyPro Verified</Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAdd && <AddProjectModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}
