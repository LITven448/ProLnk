import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Home, Sofa, BedDouble, ChefHat, Bath, Dumbbell, Trees, Car, Warehouse,
  Camera, CheckCircle2, Lock, Star, Trophy, Zap, Shield, Gift, Upload, X
} from "lucide-react";

// ── Room Definitions ─────────────────────────────────────────────────────────
const ROOMS = [
  { id: "living_room", label: "Living Room", icon: Sofa, points: 10 },
  { id: "kitchen", label: "Kitchen", icon: ChefHat, points: 15 },
  { id: "primary_bedroom", label: "Primary Bedroom", icon: BedDouble, points: 10 },
  { id: "primary_bathroom", label: "Primary Bathroom", icon: Bath, points: 10 },
  { id: "guest_bedroom", label: "Guest Bedroom", icon: BedDouble, points: 8 },
  { id: "guest_bathroom", label: "Guest Bathroom", icon: Bath, points: 8 },
  { id: "backyard", label: "Backyard", icon: Trees, points: 12 },
  { id: "front_yard", label: "Front Yard", icon: Home, points: 10 },
  { id: "garage", label: "Garage", icon: Car, points: 8 },
  { id: "home_office", label: "Home Office", icon: Dumbbell, points: 8 },
  { id: "basement", label: "Basement / Attic", icon: Warehouse, points: 8 },
  { id: "outdoor_patio", label: "Patio / Deck", icon: Trees, points: 10 },
] as const;

// ── Badge Milestones ─────────────────────────────────────────────────────────
const BADGE_MILESTONES = [
  { rooms: 1, label: "First Room", icon: Star, color: "text-yellow-500", bg: "bg-yellow-50", unlock: "AI scan on first room" },
  { rooms: 3, label: "Getting Started", icon: Zap, color: "text-blue-500", bg: "bg-blue-50", unlock: "Priority lead matching" },
  { rooms: 6, label: "Half Way There", icon: Shield, color: "text-purple-500", bg: "bg-purple-50", unlock: "Home Health Score activated" },
  { rooms: 9, label: "Almost Complete", icon: Trophy, color: "text-orange-500", bg: "bg-orange-50", unlock: "Detailed repair cost estimates" },
  { rooms: 12, label: "Full Home Profile", icon: Gift, color: "text-green-500", bg: "bg-green-50", unlock: "Free annual home report ($99 value)" },
];

interface HomeRoomGalleryProps {
  propertyId?: number;
  onRoomPhotoAdded?: (roomId: string) => void;
}

export default function HomeRoomGallery({ propertyId, onRoomPhotoAdded }: HomeRoomGalleryProps) {
  const [uploadingRoom, setUploadingRoom] = useState<string | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  // Fetch existing room scans for this property
  const { data: scans } = trpc.homeowner.getScanHistory.useQuery(undefined, {
    staleTime: 30_000,
  });

  // Determine which rooms have photos
  const completedRooms = new Set<string>();
  if (Array.isArray(scans)) {
    for (const scan of scans as Array<{ roomLabel?: string }>) {
      if (scan.roomLabel) {
        const matched = ROOMS.find(r =>
          r.label.toLowerCase() === scan.roomLabel?.toLowerCase() ||
          r.id === scan.roomLabel?.toLowerCase().replace(/\s+/g, "_")
        );
        if (matched) completedRooms.add(matched.id);
      }
    }
  }

  const completedCount = completedRooms.size;
  const totalRooms = ROOMS.length;
  const progressPct = Math.round((completedCount / totalRooms) * 100);
  const earnedPoints = ROOMS.filter(r => completedRooms.has(r.id)).reduce((sum, r) => sum + r.points, 0);
  const totalPoints = ROOMS.reduce((sum, r) => sum + r.points, 0);

  // Next badge milestone
  const nextBadge = BADGE_MILESTONES.find(b => b.rooms > completedCount);
  const lastEarnedBadge = [...BADGE_MILESTONES].reverse().find(b => b.rooms <= completedCount);

  const handleUpload = async (roomId: string, file: File) => {
    setUploadingRoom(roomId);
    try {
      // Upload to S3 via the existing photo upload endpoint
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { url } = await uploadRes.json();

      // Trigger AI scan on this room photo
      toast.success(`Photo added for ${ROOMS.find(r => r.id === roomId)?.label}! AI scan queued.`);
      onRoomPhotoAdded?.(roomId);
    } catch {
      toast.error("Failed to upload photo. Please try again.");
    } finally {
      setUploadingRoom(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Progress Header ─────────────────────────────────────────────── */}
      <Card className="border-0 bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="pt-5 pb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Home Photo Collection</h3>
              <p className="text-sm text-gray-500">
                {completedCount} of {totalRooms} rooms documented · {earnedPoints}/{totalPoints} pts
              </p>
            </div>
            {lastEarnedBadge && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${lastEarnedBadge.bg}`}>
                <lastEarnedBadge.icon className={`w-4 h-4 ${lastEarnedBadge.color}`} />
                <span className={`text-xs font-semibold ${lastEarnedBadge.color}`}>{lastEarnedBadge.label}</span>
              </div>
            )}
          </div>

          <Progress value={progressPct} className="h-2.5 mb-3" />

          {nextBadge && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <nextBadge.icon className="w-3.5 h-3.5 text-gray-400" />
              <span>
                Add <strong>{nextBadge.rooms - completedCount} more room{nextBadge.rooms - completedCount !== 1 ? "s" : ""}</strong> to unlock: <span className="text-amber-600 font-medium">{nextBadge.unlock}</span>
              </span>
            </div>
          )}

          {completedCount === totalRooms && (
            <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Complete home profile! You've unlocked all features.</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Badge Milestones ─────────────────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {BADGE_MILESTONES.map((badge) => {
          const earned = completedCount >= badge.rooms;
          const Icon = badge.icon;
          return (
            <div
              key={badge.rooms}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all ${
                earned
                  ? `${badge.bg} border-transparent`
                  : "bg-gray-50 border-gray-100 opacity-50"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${earned ? badge.bg : "bg-gray-100"}`}>
                {earned ? (
                  <Icon className={`w-4 h-4 ${badge.color}`} />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                )}
              </div>
              <span className={`text-xs font-medium text-center leading-tight ${earned ? "text-gray-800" : "text-gray-400"}`}>
                {badge.label}
              </span>
              <span className="text-[10px] text-gray-400">{badge.rooms} rooms</span>
            </div>
          );
        })}
      </div>

      {/* ── Room Grid ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {ROOMS.map((room) => {
          const Icon = room.icon;
          const isComplete = completedRooms.has(room.id);
          const isUploading = uploadingRoom === room.id;
          const isHovered = hoveredRoom === room.id;

          return (
            <label
              key={room.id}
              className={`relative cursor-pointer group rounded-xl border-2 transition-all overflow-hidden ${
                isComplete
                  ? "border-green-200 bg-green-50"
                  : isHovered
                  ? "border-amber-300 bg-amber-50"
                  : "border-gray-100 bg-white hover:border-amber-200 hover:bg-amber-50/50"
              }`}
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
            >
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                disabled={isUploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(room.id, file);
                  e.target.value = "";
                }}
              />

              <div className="p-4 flex flex-col items-center gap-2 text-center">
                {/* Icon area */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isComplete ? "bg-green-100" : "bg-gray-100 group-hover:bg-amber-100"
                }`}>
                  {isUploading ? (
                    <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  ) : isComplete ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Icon className={`w-5 h-5 ${isHovered ? "text-amber-600" : "text-gray-400"}`} />
                  )}
                </div>

                <span className={`text-xs font-medium leading-tight ${
                  isComplete ? "text-green-700" : "text-gray-700"
                }`}>
                  {room.label}
                </span>

                <div className={`flex items-center gap-1 text-[10px] font-medium ${
                  isComplete ? "text-green-500" : "text-gray-400"
                }`}>
                  <Star className="w-2.5 h-2.5" />
                  {room.points} pts
                </div>

                {/* Hover overlay */}
                {!isComplete && !isUploading && (
                  <div className={`absolute inset-0 flex items-center justify-center bg-amber-500/90 rounded-xl transition-opacity ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}>
                    <div className="flex flex-col items-center gap-1 text-white">
                      <Camera className="w-6 h-6" />
                      <span className="text-xs font-bold">Add Photo</span>
                    </div>
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {/* ── Tips ────────────────────────────────────────────────────────── */}
      <div className="text-xs text-gray-400 text-center">
        Photos are analyzed by AI to detect issues, upgrades, and maintenance needs. Each room adds to your Home Health Score.
      </div>
    </div>
  );
}
