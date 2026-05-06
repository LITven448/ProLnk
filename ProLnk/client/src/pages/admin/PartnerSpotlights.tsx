import { useState } from "react";
import { Award, Star, Eye, EyeOff, Plus, Trash2, GripVertical, Image } from "lucide-react";
import { toast } from "sonner";

interface Spotlight {
  id: number;
  partnerName: string;
  businessName: string;
  trade: string;
  headline: string;
  story: string;
  photoUrl: string | null;
  featured: boolean;
  displayOrder: number;
  stats: { jobsCompleted: number; avgRating: number; referralsMade: number };
  createdAt: string;
}

const SAMPLE_SPOTLIGHTS: Spotlight[] = [
  { id: 1, partnerName: "Mike Johnson", businessName: "Johnson Plumbing", trade: "Plumbing", headline: "From Solo Plumber to 5-Truck Operation", story: "Since joining ProLnk, Mike has grown his business by 300% through AI-powered referrals...", photoUrl: null, featured: true, displayOrder: 1, stats: { jobsCompleted: 247, avgRating: 4.9, referralsMade: 38 }, createdAt: new Date().toISOString() },
  { id: 2, partnerName: "Sarah Chen", businessName: "DFW Elite Electric", trade: "Electrical", headline: "Building Trust Through Transparency", story: "Sarah uses TrustyPro's photo analysis to show homeowners exactly what needs attention...", photoUrl: null, featured: true, displayOrder: 2, stats: { jobsCompleted: 183, avgRating: 4.8, referralsMade: 22 }, createdAt: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 3, partnerName: "Carlos Rivera", businessName: "Rivera Roofing", trade: "Roofing", headline: "Storm Season Champion", story: "After the April 2025 hailstorm, Carlos used ProLnk's storm alert system to help 45 homeowners...", photoUrl: null, featured: false, displayOrder: 3, stats: { jobsCompleted: 156, avgRating: 4.7, referralsMade: 15 }, createdAt: new Date(Date.now() - 86400000 * 7).toISOString() },
];

export default function PartnerSpotlights() {
  const [spotlights, setSpotlights] = useState<Spotlight[]>(SAMPLE_SPOTLIGHTS);
  const [editing, setEditing] = useState<number | null>(null);

  const toggleFeatured = (id: number) => {
    setSpotlights(prev => prev.map(s => s.id === id ? { ...s, featured: !s.featured } : s));
    toast.success("Spotlight visibility updated");
  };

  const removeSpotlight = (id: number) => {
    setSpotlights(prev => prev.filter(s => s.id !== id));
    toast.success("Spotlight removed");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partner Spotlights</h1>
          <p className="text-sm text-gray-500 mt-1">Feature top-performing partners on the public site</p>
        </div>
        <button onClick={() => toast.info("Create spotlight form coming soon")} className="flex items-center gap-2 px-4 py-2 bg-[#0A1628] text-white rounded-lg text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> New Spotlight
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="text-2xl font-bold text-gray-900">{spotlights.length}</div>
          <div className="text-xs text-gray-500 mt-1">Total Spotlights</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-2xl font-bold text-green-600">{spotlights.filter(s => s.featured).length}</div>
          <div className="text-xs text-gray-500 mt-1">Currently Featured</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-2xl font-bold text-amber-600">{Math.round(spotlights.reduce((sum, s) => sum + s.stats.avgRating, 0) / spotlights.length * 10) / 10}</div>
          <div className="text-xs text-gray-500 mt-1">Avg Rating</div>
        </div>
      </div>

      {/* Spotlight Cards */}
      <div className="space-y-4">
        {spotlights.map(s => (
          <div key={s.id} className={`bg-white rounded-xl border p-6 transition-all ${s.featured ? "border-amber-200 shadow-sm" : "opacity-70"}`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                {s.photoUrl ? <img src={s.photoUrl} alt={s.partnerName} className="w-full h-full object-cover rounded-xl" /> : <Image className="w-6 h-6 text-gray-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{s.partnerName}</h3>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-sm text-gray-600">{s.businessName}</span>
                  {s.featured && <Award className="w-4 h-4 text-amber-500" />}
                </div>
                <div className="text-xs text-gray-500 mb-2">{s.trade}</div>
                <h4 className="font-semibold text-gray-800 mb-1">{s.headline}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{s.story}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-gray-500">{s.stats.jobsCompleted} jobs</span>
                  <span className="flex items-center gap-1 text-xs text-amber-600"><Star className="w-3 h-3" /> {s.stats.avgRating}</span>
                  <span className="text-xs text-gray-500">{s.stats.referralsMade} referrals</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleFeatured(s.id)} className={`p-2 rounded-lg transition-colors ${s.featured ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}>
                  {s.featured ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => removeSpotlight(s.id)} className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="p-2 text-gray-300 cursor-grab">
                  <GripVertical className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
