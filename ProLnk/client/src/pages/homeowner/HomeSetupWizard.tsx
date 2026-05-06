/**
 * TrustyPro Deep Home Profile Wizard — 8 Steps
 * Collects maximum property intelligence for AI matching, data asset value, and exit valuation.
 * All data persists to DB via tRPC mutations.
 *
 * Steps:
 *  1. Property Basics       — address, type, year, sqft, beds/baths, lot, garage, pool, fence
 *  2. Ownership Context     — ownership years, occupancy, rental status, hiring priorities
 *  3. Home Systems          — HVAC, roof, plumbing, electrical, etc. with estimated age
 *  4. Past Improvements     — what was done in last 5 years (category + year + warranty)
 *  5. Wish List             — projects they want done (category + budget + urgency)
 *  6. Style Preferences     — home style, exterior color, interior palette, aesthetic, notes
 *  7. Property Photos       — room-by-room photo uploads (exterior, kitchen, bathrooms, etc.)
 *  8. Data Consent + Done   — consent flags, summary, go to dashboard
 */
import { useState, useRef } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Home, MapPin, Calendar, Ruler, Bed, Bath, Waves,
  Wrench, Zap, Droplets, Shield, TreePine, Building2, Flame,
  Hammer, Paintbrush, Sparkles, Camera, CheckCircle, ChevronLeft,
  ChevronRight, Plus, Trash2, DollarSign, Clock, Star, Upload,
  Eye, Lock, AlertTriangle, Info, Heart, ArrowRight, Leaf,
  PawPrint, Sun, Car, Layers, Utensils, Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// ─── Constants ───────────────────────────────────────────────────────────────

const STEPS = [
  { title: "Property Basics",      desc: "Tell us about your home",                      icon: Home },
  { title: "Ownership & Lifestyle",desc: "How long have you owned it?",                  icon: Building2 },
  { title: "Home Systems",         desc: "What systems does your home have?",             icon: Wrench },
  { title: "Past Improvements",    desc: "What work has been done in the last 5 years?", icon: Hammer },
  { title: "Wish List",            desc: "What projects are on your radar?",              icon: Heart },
  { title: "Interior & Style",     desc: "Finishes, materials, and aesthetic",            icon: Paintbrush },
  { title: "Property Photos",      desc: "Show us your home room by room",                icon: Camera },
  { title: "Consent & Finish",     desc: "Review and activate your profile",              icon: CheckCircle },
];

const FLOORING_TYPES = [
  "Hardwood", "Engineered Wood", "Tile / Ceramic", "Luxury Vinyl Plank",
  "Carpet", "Concrete / Polished", "Laminate", "Stone / Marble",
];

const PET_SERVICE_NEEDS = [
  "Pet-Safe Lawn Products", "Pet Waste Removal", "Pet Door Installation",
  "Fence Repair / Pet Containment", "Pet-Friendly Flooring", "Odor / Stain Treatment",
  "Yard Deodorizing", "Pet-Safe Pest Control",
];

const HOME_TYPES = [
  { value: "single_family", label: "Single Family",  icon: "🏠" },
  { value: "townhouse",     label: "Townhouse",      icon: "🏘️" },
  { value: "condo",         label: "Condo / Apt",    icon: "🏢" },
  { value: "multi_family",  label: "Multi-Family",   icon: "🏗️" },
  { value: "other",         label: "Other",          icon: "🏡" },
];

const YEAR_RANGES = [
  { value: 1955, label: "Before 1960" },
  { value: 1965, label: "1960–1970" },
  { value: 1975, label: "1971–1980" },
  { value: 1985, label: "1981–1990" },
  { value: 1995, label: "1991–2000" },
  { value: 2005, label: "2001–2010" },
  { value: 2015, label: "2011–2020" },
  { value: 2022, label: "2021 or newer" },
];

const SQFT_RANGES = [
  { value: 750,  label: "Under 1,000 sq ft" },
  { value: 1500, label: "1,000–2,000 sq ft" },
  { value: 2750, label: "2,000–3,500 sq ft" },
  { value: 4250, label: "3,500–5,000 sq ft" },
  { value: 6000, label: "Over 5,000 sq ft" },
];

const LOT_SIZES = [
  { value: "under_0_25",  label: "Under ¼ acre" },
  { value: "0_25_to_0_5", label: "¼–½ acre" },
  { value: "0_5_to_1",    label: "½–1 acre" },
  { value: "over_1",      label: "Over 1 acre" },
];

const OWNERSHIP_YEARS = [
  { value: "under_1",  label: "Less than 1 year" },
  { value: "1_to_3",   label: "1–3 years" },
  { value: "3_to_7",   label: "3–7 years" },
  { value: "7_to_15",  label: "7–15 years" },
  { value: "over_15",  label: "Over 15 years" },
];

const HIRING_PRIORITIES = [
  "Licensed & Insured",
  "Background Checked",
  "Lowest Price",
  "Best Reviews",
  "Fastest Availability",
  "Local Business",
  "Eco-Friendly",
  "Bilingual (Spanish)",
  "Same-Day Service",
  "Warranty Included",
];

const HOME_SYSTEMS = [
  { id: "hvac",          label: "HVAC / AC",          icon: Zap,       desc: "Heating, cooling, air quality" },
  { id: "roof",          label: "Roof",                icon: Home,      desc: "Shingles, flashing, gutters" },
  { id: "plumbing",      label: "Plumbing",            icon: Droplets,  desc: "Pipes, water heater, fixtures" },
  { id: "electrical",    label: "Electrical",          icon: Zap,       desc: "Panel, wiring, outlets" },
  { id: "pool",          label: "Pool / Spa",          icon: Waves,     desc: "Pool equipment, spa" },
  { id: "lawn",          label: "Lawn / Irrigation",   icon: TreePine,  desc: "Sprinklers, drainage, sod" },
  { id: "security",      label: "Security System",     icon: Shield,    desc: "Cameras, alarms, smart locks" },
  { id: "foundation",    label: "Foundation",          icon: Building2, desc: "Slab, pier & beam, drainage" },
  { id: "windows_doors", label: "Windows & Doors",     icon: Home,      desc: "Insulation, seals, hardware" },
  { id: "fireplace",     label: "Fireplace / Chimney", icon: Flame,     desc: "Gas, wood-burning, flue" },
  { id: "solar",         label: "Solar / Battery",     icon: Zap,       desc: "Panels, inverter, battery backup" },
  { id: "pest",          label: "Pest Control",        icon: Shield,    desc: "Termite bond, monthly service" },
  { id: "fence",         label: "Fence / Gate",        icon: Leaf,      desc: "Wood, iron, chain link" },
  { id: "driveway",      label: "Driveway / Concrete", icon: Building2, desc: "Concrete, pavers, asphalt" },
  { id: "generator",     label: "Generator",           icon: Zap,       desc: "Standby or portable" },
  { id: "water_softener",label: "Water Softener",      icon: Droplets,  desc: "Softener, filtration system" },
];

const SYSTEM_AGES = [
  { value: "0_2",    label: "0–2 yrs (new)" },
  { value: "3_5",    label: "3–5 yrs" },
  { value: "6_10",   label: "6–10 yrs" },
  { value: "11_15",  label: "11–15 yrs" },
  { value: "over_15",label: "15+ yrs (aging)" },
  { value: "unknown",label: "Not sure" },
];

const IMPROVEMENT_CATEGORIES = [
  "Roof Replacement", "HVAC Replacement", "HVAC Tune-Up", "Water Heater",
  "Kitchen Remodel", "Bathroom Remodel", "Flooring", "Interior Paint",
  "Exterior Paint", "Windows Replacement", "Doors Replacement",
  "Foundation Repair", "Fence Installation / Repair", "Deck / Patio",
  "Pool Installation / Repair", "Landscaping / Sod", "Irrigation System",
  "Electrical Panel Upgrade", "Plumbing Re-pipe", "Insulation",
  "Solar Installation", "Garage Door", "Driveway / Concrete",
  "Pest Control Treatment", "Gutter Replacement", "Siding",
  "Smart Home / Security System", "Attic Conversion", "Room Addition",
];

const WISH_CATEGORIES = [
  "Kitchen Remodel", "Master Bathroom Remodel", "Guest Bathroom Remodel",
  "Flooring Upgrade", "Interior Paint / Refresh", "Exterior Paint",
  "Roof Replacement", "HVAC Replacement", "Windows Replacement",
  "Fence Replacement", "Deck / Patio Addition", "Pool Installation",
  "Landscaping Overhaul", "Irrigation System", "Outdoor Kitchen",
  "Garage Conversion / Addition", "Room Addition", "Basement Finish",
  "Smart Home Upgrade", "Solar Installation", "EV Charger",
  "Foundation Repair", "Gutter Replacement", "Siding Replacement",
  "Attic Insulation", "Water Heater Replacement", "Pest Control",
  "Pressure Washing", "Holiday Lighting", "Driveway Replacement",
];

const BUDGET_RANGES = [
  { value: "under_1k", label: "Under $1,000" },
  { value: "1k_5k",    label: "$1,000–$5,000" },
  { value: "5k_15k",   label: "$5,000–$15,000" },
  { value: "15k_50k",  label: "$15,000–$50,000" },
  { value: "over_50k", label: "Over $50,000" },
  { value: "not_sure", label: "Not sure yet" },
];

const URGENCY_OPTIONS = [
  { value: "within_30_days",   label: "Within 30 days",   color: "#DC2626" },
  { value: "1_to_3_months",    label: "1–3 months",       color: "#D97706" },
  { value: "3_to_6_months",    label: "3–6 months",       color: "#059669" },
  { value: "6_to_12_months",   label: "6–12 months",      color: "#0891b2" },
  { value: "just_researching", label: "Just researching", color: "#6B7280" },
];

const HOME_STYLES = [
  "Traditional / Colonial", "Modern / Contemporary", "Craftsman / Bungalow",
  "Ranch / Mid-Century", "Mediterranean / Spanish", "Farmhouse / Rustic",
  "Tudor / European", "Cape Cod", "Victorian", "Other",
];

const EXTERIOR_COLORS = [
  "White / Cream", "Gray / Greige", "Beige / Tan", "Navy / Dark Blue",
  "Black / Charcoal", "Sage / Olive Green", "Brick Red / Terracotta",
  "Yellow / Gold", "Brown / Chocolate", "Mixed / Custom",
];

const INTERIOR_PALETTES = [
  "Bright & Airy (whites, light grays)",
  "Warm Neutrals (beige, tan, warm white)",
  "Bold & Dramatic (dark walls, accent colors)",
  "Earthy & Natural (greens, browns, terracotta)",
  "Coastal / Coastal Modern (blues, whites)",
  "Industrial (grays, blacks, exposed materials)",
  "Scandinavian (minimal, light wood, white)",
  "Eclectic / Maximalist",
];

const DESIGN_AESTHETICS = [
  "Minimalist", "Luxury / High-End", "Cozy / Warm", "Clean & Modern",
  "Rustic / Farmhouse", "Transitional", "Bohemian", "Classic / Timeless",
];

const PHOTO_ROOMS = [
  {
    id: "exterior_front", label: "Front Exterior", icon: "🏠", tip: "Full view of the front of your home",
    shots: ["Full front from the street", "Driveway and entry door", "Close-up of any visible damage or wear"],
    guidance: "Stand at the street or sidewalk. Capture the entire front facade in one shot."
  },
  {
    id: "exterior_back", label: "Back Exterior", icon: "🌿", tip: "Backyard, patio, deck, or pool area",
    shots: ["Full backyard from the house", "Patio, deck, or pool area", "Fence line and gates"],
    guidance: "Stand with your back to the house and capture the full yard. Then turn around for the house rear view."
  },
  {
    id: "exterior_side", label: "Side / Garage", icon: "🚗", tip: "Garage doors, driveway, side yard",
    shots: ["Garage doors (closed)", "Driveway surface", "Side yard or utility area"],
    guidance: "Capture the full garage facade. Note any cracks in the driveway or staining on the garage floor."
  },
  {
    id: "kitchen", label: "Kitchen", icon: "🍳", tip: "Cabinets, countertops, appliances, sink",
    shots: ["Corner shot showing cabinets and counters", "Appliances (stove, fridge, dishwasher)", "Sink and faucet", "Under-sink cabinet interior"],
    guidance: "Shoot from a corner to capture as much of the kitchen as possible. Open cabinet doors for a second shot if there is visible wear."
  },
  {
    id: "living_room", label: "Living Room", icon: "🛋️", tip: "Main living or family room",
    shots: ["Full room from corner", "Fireplace or feature wall", "Windows and natural light"],
    guidance: "Stand in the corner opposite the main focal point (TV wall, fireplace). Capture floor to ceiling."
  },
  {
    id: "primary_bath", label: "Primary Bathroom", icon: "🚿", tip: "Master bath — shower, tub, vanity",
    shots: ["Full bathroom from doorway", "Shower or tub close-up", "Vanity and sink", "Toilet area"],
    guidance: "Stand in the doorway for the wide shot. Then get close-ups of the shower grout, caulk, and faucet condition."
  },
  {
    id: "guest_bath", label: "Guest Bathroom", icon: "🪥", tip: "Secondary bathroom",
    shots: ["Full bathroom from doorway", "Shower/tub and tile", "Vanity and fixtures"],
    guidance: "Same approach as the primary bath. Focus on tile and grout condition."
  },
  {
    id: "primary_bedroom", label: "Primary Bedroom", icon: "🛏️", tip: "Master bedroom",
    shots: ["Full room from corner", "Closet interior", "Windows"],
    guidance: "Capture the full room from the corner opposite the bed. Open the closet for a second shot."
  },
  {
    id: "flooring", label: "Flooring", icon: "🪵", tip: "Floors in main areas — hardwood, tile, carpet",
    shots: ["Main living area floor", "Kitchen floor", "Any transition areas or damage"],
    guidance: "Get low and shoot along the floor to show texture and any scratches, gaps, or staining."
  },
  {
    id: "roof_gutters", label: "Roof / Gutters", icon: "🏗️", tip: "Roof condition, gutters, flashing",
    shots: ["Roof from ground (front)", "Roof from ground (back)", "Gutters and downspouts", "Any visible damage or missing shingles"],
    guidance: "Stay on the ground. Use zoom if needed. Capture all four sides if possible. Note any sagging gutters or dark staining."
  },
  {
    id: "fence_gate", label: "Fence / Gate", icon: "🚧", tip: "Fence condition, gate hardware",
    shots: ["Full fence line", "Gate and hardware", "Any damaged or leaning sections"],
    guidance: "Walk the fence line and photograph any sections showing rot, lean, or broken boards."
  },
  {
    id: "hvac_unit", label: "HVAC Unit", icon: "❄️", tip: "Outdoor AC unit, indoor air handler",
    shots: ["Outdoor condenser unit", "Indoor air handler or furnace", "Thermostat", "Visible ductwork or vents"],
    guidance: "Photograph the unit label/nameplate for model and serial number. Note any rust, bent fins, or debris around the unit."
  },
  {
    id: "water_heater", label: "Water Heater", icon: "🌡️", tip: "Tank or tankless water heater",
    shots: ["Full unit showing brand and size", "Nameplate with model/serial", "Connections and pipes"],
    guidance: "Photograph the label clearly — model and serial number help us estimate remaining life. Note any rust or moisture around the base."
  },
  {
    id: "electrical_panel", label: "Electrical Panel", icon: "⚡", tip: "Breaker box — open the door for the photo",
    shots: ["Panel door open showing breakers", "Panel label showing amperage", "Any visible concerns"],
    guidance: "Open the panel door and photograph the full breaker layout. Note the main breaker amperage (100A, 150A, 200A)."
  },
];

// ─── Chip component ───────────────────────────────────────────────────────────
function Chip({ label, active, onClick, color }: { label: string; active: boolean; onClick: () => void; color?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
        active ? "text-white border-transparent" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
      }`}
      style={active ? { backgroundColor: color ?? "#0A1628", borderColor: color ?? "#0A1628" } : {}}
    >
      {label}
    </button>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = ((step - 1) / (total - 1)) * 100;
  return (
    <div className="mb-6">
      <div className="flex justify-between text-[10px] text-gray-400 mb-1.5">
        <span>Step {step} of {total}</span>
        <span>{Math.round(pct)}% complete</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg,#0A1628 0%,#0891b2 100%)" }}
        />
      </div>
    </div>
  );
}

// ─── Step 1: Property Basics ──────────────────────────────────────────────────
function Step1({ data, setData }: { data: any; setData: (d: any) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Property type</Label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {HOME_TYPES.map((t) => (
            <button key={t.value} type="button" onClick={() => setData({ ...data, propertyType: t.value })}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                data.propertyType === t.value ? "border-[#0A1628] bg-[#0A1628]/5" : "border-gray-200 hover:border-gray-300 bg-white"
              }`}>
              <span className="text-xl">{t.icon}</span>
              <span className="text-[10px] font-medium text-gray-700 text-center leading-tight">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">
          <MapPin className="w-3.5 h-3.5 inline mr-1" />Property address
        </Label>
        <Input placeholder="123 Main St, Dallas, TX 75201" value={data.address ?? ""}
          onChange={(e) => setData({ ...data, address: e.target.value })} className="text-sm" />
        <p className="text-[10px] text-gray-400 mt-1">Used for AI matching and service area routing</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label className="text-xs font-semibold text-gray-600 mb-1 block">City</Label>
          <Input placeholder="Frisco" value={data.city ?? ""} onChange={(e) => setData({ ...data, city: e.target.value })} className="text-sm" />
        </div>
        <div>
          <Label className="text-xs font-semibold text-gray-600 mb-1 block">State</Label>
          <Input placeholder="TX" value={data.state ?? ""} onChange={(e) => setData({ ...data, state: e.target.value })} className="text-sm" maxLength={2} />
        </div>
        <div>
          <Label className="text-xs font-semibold text-gray-600 mb-1 block">ZIP</Label>
          <Input placeholder="75034" value={data.zip ?? ""} onChange={(e) => setData({ ...data, zip: e.target.value })} className="text-sm" maxLength={10} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-2 block">
            <Calendar className="w-3.5 h-3.5 inline mr-1" />Year built
          </Label>
          <select value={data.yearBuilt ?? ""} onChange={(e) => setData({ ...data, yearBuilt: Number(e.target.value) })}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20 bg-white">
            <option value="">Select range</option>
            {YEAR_RANGES.map((y) => <option key={y.value} value={y.value}>{y.label}</option>)}
          </select>
        </div>
        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-2 block">
            <Ruler className="w-3.5 h-3.5 inline mr-1" />Square footage
          </Label>
          <select value={data.sqft ?? ""} onChange={(e) => setData({ ...data, sqft: Number(e.target.value) })}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20 bg-white">
            <option value="">Select range</option>
            {SQFT_RANGES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-2 block">
            <Bed className="w-3.5 h-3.5 inline mr-1" />Bedrooms
          </Label>
          <select value={data.bedrooms ?? ""} onChange={(e) => setData({ ...data, bedrooms: Number(e.target.value) })}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20 bg-white">
            <option value="">Select</option>
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}{n===8?"+":" "}</option>)}
          </select>
        </div>
        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-2 block">
            <Bath className="w-3.5 h-3.5 inline mr-1" />Bathrooms
          </Label>
          <select value={data.bathrooms ?? ""} onChange={(e) => setData({ ...data, bathrooms: Number(e.target.value) })}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20 bg-white">
            <option value="">Select</option>
            {[1,1.5,2,2.5,3,3.5,4,4.5,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">Lot size</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {LOT_SIZES.map((l) => (
            <button key={l.value} type="button" onClick={() => setData({ ...data, lotSize: l.value })}
              className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                data.lotSize === l.value ? "border-[#0A1628] bg-[#0A1628] text-white" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
              }`}>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stories */}
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">
          <Layers className="w-3.5 h-3.5 inline mr-1" />Number of stories
        </Label>
        <div className="grid grid-cols-4 gap-2">
          {[{v:"1",l:"1 Story"},{v:"1.5",l:"1.5 Stories"},{v:"2",l:"2 Stories"},{v:"3_plus",l:"3+"}].map((s) => (
            <button key={s.v} type="button" onClick={() => setData({ ...data, storiesCount: s.v })}
              className={`px-2 py-2 rounded-lg border text-xs font-medium transition-all ${
                data.storiesCount === s.v ? "border-[#0A1628] bg-[#0A1628] text-white" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
              }`}>{s.l}</button>
          ))}
        </div>
      </div>

      {/* Property features */}
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Exterior features</Label>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "hasPool",          label: "Pool",              icon: "🏊" },
            { key: "hasSpa",           label: "Spa / Hot Tub",     icon: "♨️" },
            { key: "hasGarage",        label: "Garage",            icon: "🚗" },
            { key: "hasFence",         label: "Fenced Yard",       icon: "🚧" },
            { key: "hasDeck",          label: "Deck",              icon: "🪵" },
            { key: "hasPatio",         label: "Patio",             icon: "⛱️" },
            { key: "hasOutdoorKitchen",label: "Outdoor Kitchen",   icon: "🍖" },
            { key: "hasBasement",      label: "Basement",          icon: "🏗️" },
            { key: "hasAttic",         label: "Attic",             icon: "🏠" },
            { key: "hasSolarPanels",   label: "Solar Panels",      icon: "☀️" },
            { key: "hasGenerator",     label: "Generator",         icon: "⚡" },
            { key: "hasSmartHome",     label: "Smart Home",        icon: "📱" },
            { key: "hasIrrigationSystem",label:"Irrigation",       icon: "💧" },
            { key: "hasSecuritySystem",label: "Security System",   icon: "🔒" },
            { key: "hasEvCharger",     label: "EV Charger",        icon: "🔌" },
            { key: "hasWaterSoftener", label: "Water Softener",    icon: "🚿" },
            { key: "hasOutdoorLighting",label:"Outdoor Lighting",  icon: "💡" },
            { key: "hasGardenBeds",    label: "Garden Beds",       icon: "🌱" },
          ].map((f) => (
            <button key={f.key} type="button" onClick={() => setData({ ...data, [f.key]: !data[f.key] })}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-xs font-medium transition-all ${
                data[f.key] ? "border-[#0A1628] bg-[#0A1628]/5 text-[#0A1628]" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
              }`}>
              <span>{f.icon}</span> {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Garage details */}
      {data.hasGarage && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-semibold text-gray-600 mb-1 block">Garage type</Label>
            <select value={data.garageType ?? "attached"} onChange={(e) => setData({ ...data, garageType: e.target.value })}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <option value="attached">Attached</option>
              <option value="detached">Detached</option>
            </select>
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-600 mb-1 block">Garage spaces</Label>
            <select value={data.garageSpaces ?? 1} onChange={(e) => setData({ ...data, garageSpaces: Number(e.target.value) })}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
              {[1,2,3,4].map(n => <option key={n} value={n}>{n} car{n>1?"s":""}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Fence details */}
      {data.hasFence && (
        <div>
          <Label className="text-xs font-semibold text-gray-600 mb-1 block">Fence material</Label>
          <div className="flex flex-wrap gap-2">
            {["Wood","Iron / Wrought","Vinyl","Chain Link","Brick / Stone","Aluminum"].map((f) => (
              <button key={f} type="button" onClick={() => setData({ ...data, fenceType: f.toLowerCase().replace(" / ","_").replace(" ","_") })}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  data.fenceType === f.toLowerCase().replace(" / ","_").replace(" ","_") ? "bg-[#0A1628] text-white border-[#0A1628]" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
                }`}>{f}</button>
            ))}
          </div>
        </div>
      )}

      {/* Driveway */}
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">
          <Car className="w-3.5 h-3.5 inline mr-1" />Driveway surface
        </Label>
        <div className="flex flex-wrap gap-2">
          {["Concrete","Asphalt","Pavers","Gravel","Brick","None"].map((d) => (
            <button key={d} type="button" onClick={() => setData({ ...data, drivewaySurface: d.toLowerCase() })}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                data.drivewaySurface === d.toLowerCase() ? "bg-[#0A1628] text-white border-[#0A1628]" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
              }`}>{d}</button>
          ))}
        </div>
      </div>

      {/* Lawn size */}
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">
          <TreePine className="w-3.5 h-3.5 inline mr-1" />Lawn / yard size
        </Label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {[{v:"minimal",l:"Minimal"},{v:"small",l:"Small"},{v:"medium",l:"Medium"},{v:"large",l:"Large"},{v:"very_large",l:"Very Large"}].map((s) => (
            <button key={s.v} type="button" onClick={() => setData({ ...data, lawnSize: s.v })}
              className={`px-2 py-2 rounded-lg border text-xs font-medium transition-all ${
                data.lawnSize === s.v ? "border-[#0A1628] bg-[#0A1628] text-white" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
              }`}>{s.l}</button>
          ))}
        </div>
      </div>

      {/* Trees */}
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">Approximate tree count</Label>
        <div className="grid grid-cols-4 gap-2">
          {[{v:"none",l:"None"},{v:"1_3",l:"1–3"},{v:"4_10",l:"4–10"},{v:"over_10",l:"10+"}].map((t) => (
            <button key={t.v} type="button" onClick={() => setData({ ...data, treeCount: t.v })}
              className={`px-2 py-2 rounded-lg border text-xs font-medium transition-all ${
                data.treeCount === t.v ? "border-[#0A1628] bg-[#0A1628] text-white" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
              }`}>{t.l}</button>
          ))}
        </div>
      </div>

      {/* Pets section */}
      <div className="p-4 rounded-xl border-2 border-amber-100 bg-amber-50/50">
        <div className="flex items-center gap-2 mb-3">
          <PawPrint className="w-4 h-4 text-amber-600" />
          <Label className="text-sm font-semibold text-gray-700">Do you have pets?</Label>
        </div>
        <div className="flex gap-3 mb-4">
          <button type="button" onClick={() => setData({ ...data, hasPets: true })}
            className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
              data.hasPets === true ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 text-gray-600 bg-white hover:border-amber-300"
            }`}>🐾 Yes, I have pets</button>
          <button type="button" onClick={() => setData({ ...data, hasPets: false, dogCount: 0, catCount: 0, otherPets: "", petServiceNeeds: [] })}
            className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
              data.hasPets === false ? "border-gray-500 bg-gray-500 text-white" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
            }`}>No pets</button>
        </div>

        {data.hasPets === true && (
          <div className="space-y-4">
            {/* Dogs */}
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-2 block">🐕 Dogs — how many?</Label>
              <div className="flex gap-2">
                {[0,1,2,3,4,"5+"].map((n) => (
                  <button key={n} type="button" onClick={() => setData({ ...data, dogCount: n === "5+" ? 5 : n })}
                    className={`w-10 h-10 rounded-lg border text-sm font-bold transition-all ${
                      data.dogCount === (n === "5+" ? 5 : n) ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 text-gray-600 bg-white hover:border-amber-300"
                    }`}>{n}</button>
                ))}
              </div>
              {(data.dogCount ?? 0) > 0 && (
                <div className="mt-2">
                  <Label className="text-xs font-semibold text-gray-600 mb-1 block">Breed size</Label>
                  <div className="flex gap-2">
                    {[{v:"small",l:"Small (under 25 lbs)"},{v:"medium",l:"Medium"},{v:"large",l:"Large (50+ lbs)"},{v:"mixed",l:"Mixed sizes"}].map((b) => (
                      <button key={b.v} type="button" onClick={() => setData({ ...data, dogBreedSize: b.v })}
                        className={`flex-1 py-1.5 rounded-lg border text-[10px] font-semibold transition-all ${
                          data.dogBreedSize === b.v ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 text-gray-600 bg-white hover:border-amber-300"
                        }`}>{b.l}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cats */}
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-2 block">🐈 Cats — how many?</Label>
              <div className="flex gap-2">
                {[0,1,2,3,4,"5+"].map((n) => (
                  <button key={n} type="button" onClick={() => setData({ ...data, catCount: n === "5+" ? 5 : n })}
                    className={`w-10 h-10 rounded-lg border text-sm font-bold transition-all ${
                      data.catCount === (n === "5+" ? 5 : n) ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 text-gray-600 bg-white hover:border-amber-300"
                    }`}>{n}</button>
                ))}
              </div>
            </div>

            {/* Other pets */}
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1 block">Other pets (optional)</Label>
              <Input placeholder="e.g. rabbits, birds, fish..." value={data.otherPets ?? ""}
                onChange={(e) => setData({ ...data, otherPets: e.target.value })} className="text-sm" />
            </div>

            {/* Pet service needs */}
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-2 block">Pet-related service needs (select all that apply)</Label>
              <div className="flex flex-wrap gap-2">
                {PET_SERVICE_NEEDS.map((s) => {
                  const needs: string[] = data.petServiceNeeds ?? [];
                  const active = needs.includes(s);
                  return (
                    <button key={s} type="button"
                      onClick={() => setData({ ...data, petServiceNeeds: active ? needs.filter(x => x !== s) : [...needs, s] })}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        active ? "bg-amber-500 text-white border-amber-500" : "border-gray-200 text-gray-600 bg-white hover:border-amber-300"
                      }`}>{s}</button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">Property nickname (optional)</Label>
        <Input placeholder='"Main Home", "Lake House", "Rental Property"' value={data.nickname ?? ""}
          onChange={(e) => setData({ ...data, nickname: e.target.value })} className="text-sm" />
      </div>
    </div>
  );
}

// ─── Step 2: Ownership Context ────────────────────────────────────────────────
function Step2({ data, setData }: { data: any; setData: (d: any) => void }) {
  const priorities: string[] = data.hiringPriorities ?? [];
  const toggle = (p: string) => {
    const next = priorities.includes(p) ? priorities.filter((x) => x !== p) : [...priorities, p];
    setData({ ...data, hiringPriorities: next });
  };
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">How long have you owned this property?</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {OWNERSHIP_YEARS.map((o) => (
            <button key={o.value} type="button" onClick={() => setData({ ...data, ownershipYears: o.value })}
              className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                data.ownershipYears === o.value ? "border-[#0A1628] bg-[#0A1628] text-white" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
              }`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Who lives here?</Label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "owner_occupied",  label: "I live here",         icon: "🏠" },
            { value: "tenant_occupied", label: "Tenant lives here",   icon: "🔑" },
            { value: "vacant",          label: "Vacant",              icon: "🚪" },
          ].map((o) => (
            <button key={o.value} type="button" onClick={() => setData({ ...data, occupancy: o.value })}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                data.occupancy === o.value ? "border-[#0A1628] bg-[#0A1628]/5" : "border-gray-200 hover:border-gray-300 bg-white"
              }`}>
              <span className="text-xl">{o.icon}</span>
              <span className="text-xs font-medium text-gray-700 text-center">{o.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Ownership Type</Label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "primary_residence", label: "Primary Residence", icon: "🏠" },
            { value: "rental",            label: "Rental Property",   icon: "🔑" },
            { value: "company_owned",     label: "Company Owned",     icon: "🏢" },
          ].map((o) => (
            <button key={o.value} type="button"
              onClick={() => setData({ ...data, ownershipType: o.value, isRental: o.value === "rental" })}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                (data.ownershipType ?? "primary_residence") === o.value
                  ? "border-[#0A1628] bg-[#0A1628]/5"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}>
              <span className="text-xl">{o.icon}</span>
              <span className="text-xs font-medium text-gray-700 text-center">{o.label}</span>
            </button>
          ))}
        </div>
      </div>

      {(data.ownershipType === "company_owned") && (
        <div className="space-y-3 p-4 rounded-xl border border-[#0A1628]/20 bg-[#0A1628]/3">
          <p className="text-xs font-semibold text-[#0A1628] uppercase tracking-wider">Company Details</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-medium text-gray-600 mb-1 block">Company Name</Label>
              <Input value={data.companyName ?? ""}
                onChange={(e) => setData({ ...data, companyName: e.target.value })}
                placeholder="Acme Properties LLC" className="h-9 text-sm" />
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-600 mb-1 block">EIN (optional)</Label>
              <Input value={data.companyEin ?? ""}
                onChange={(e) => setData({ ...data, companyEin: e.target.value })}
                placeholder="12-3456789" className="h-9 text-sm" />
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-600 mb-1 block">Property Manager Name</Label>
              <Input value={data.propertyManagerName ?? ""}
                onChange={(e) => setData({ ...data, propertyManagerName: e.target.value })}
                placeholder="Jane Smith" className="h-9 text-sm" />
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-600 mb-1 block">Property Manager Phone</Label>
              <Input value={data.propertyManagerPhone ?? ""}
                onChange={(e) => setData({ ...data, propertyManagerPhone: e.target.value })}
                placeholder="(214) 555-0100" className="h-9 text-sm" />
            </div>
          </div>
        </div>
      )}

      {(data.ownershipType === "rental") && (
        <div className="space-y-3 p-4 rounded-xl border border-amber-200 bg-amber-50">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Property Manager (optional)</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-medium text-gray-600 mb-1 block">Manager Name</Label>
              <Input value={data.propertyManagerName ?? ""}
                onChange={(e) => setData({ ...data, propertyManagerName: e.target.value })}
                placeholder="Property manager name" className="h-9 text-sm" />
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-600 mb-1 block">Manager Phone</Label>
              <Input value={data.propertyManagerPhone ?? ""}
                onChange={(e) => setData({ ...data, propertyManagerPhone: e.target.value })}
                placeholder="(214) 555-0100" className="h-9 text-sm" />
            </div>
          </div>
        </div>
      )}

      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-1 block">What matters most when hiring a pro?</Label>
        <p className="text-xs text-gray-400 mb-3">Select all that apply — we'll use this to rank your matches</p>
        <div className="flex flex-wrap gap-2">
          {HIRING_PRIORITIES.map((p) => (
            <Chip key={p} label={p} active={priorities.includes(p)} onClick={() => toggle(p)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Home Systems ─────────────────────────────────────────────────────
function Step3({ data, setData }: { data: any; setData: (d: any) => void }) {
  const systems: string[] = data.systems ?? [];
  const systemAges: Record<string, string> = data.systemAges ?? {};
  const toggle = (id: string) => {
    const next = systems.includes(id) ? systems.filter((s) => s !== id) : [...systems, id];
    setData({ ...data, systems: next });
  };
  const setAge = (id: string, age: string) => setData({ ...data, systemAges: { ...systemAges, [id]: age } });

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">Select all systems your home has. For selected systems, tell us their approximate age — this helps us prioritize maintenance alerts.</p>
      {HOME_SYSTEMS.map((sys) => {
        const Icon = sys.icon;
        const active = systems.includes(sys.id);
        return (
          <div key={sys.id} className={`rounded-xl border-2 overflow-hidden transition-all ${active ? "border-[#0A1628]" : "border-gray-200"}`}>
            <button type="button" onClick={() => toggle(sys.id)}
              className={`w-full flex items-center gap-3 p-3.5 text-left transition-all ${active ? "bg-[#0A1628]/5" : "bg-white hover:bg-gray-50"}`}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? "bg-[#0A1628]" : "bg-gray-100"}`}>
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-gray-500"}`} />
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${active ? "text-[#0A1628]" : "text-gray-700"}`}>{sys.label}</p>
                <p className="text-[10px] text-gray-400">{sys.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${active ? "border-[#0A1628] bg-[#0A1628]" : "border-gray-300"}`}>
                {active && <CheckCircle className="w-3 h-3 text-white" />}
              </div>
            </button>
            {active && (
              <div className="px-4 pb-3 pt-1 bg-[#0A1628]/3 border-t border-[#0A1628]/10">
                <Label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Approximate age</Label>
                <div className="flex flex-wrap gap-1.5">
                  {SYSTEM_AGES.map((a) => (
                    <button key={a.value} type="button" onClick={() => setAge(sys.id, a.value)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all ${
                        systemAges[sys.id] === a.value ? "bg-[#0A1628] text-white border-[#0A1628]" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
                      }`}>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 4: Past Improvements ────────────────────────────────────────────────
function Step4({ data, setData }: { data: any; setData: (d: any) => void }) {
  const improvements: Array<{ category: string; completedYear: number | null; hasWarranty: boolean; notes: string }> = data.improvements ?? [];
  const add = () => setData({ ...data, improvements: [...improvements, { category: "", completedYear: new Date().getFullYear(), hasWarranty: false, notes: "" }] });
  const remove = (i: number) => setData({ ...data, improvements: improvements.filter((_, idx) => idx !== i) });
  const update = (i: number, field: string, value: any) => setData({ ...data, improvements: improvements.map((imp, idx) => idx === i ? { ...imp, [field]: value } : imp) });

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700">List any major work done in the last 5 years. This builds your property's value history and helps AI identify what's next.</p>
      </div>
      {improvements.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Hammer className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No improvements added yet</p>
          <p className="text-xs mt-1">Click below to add work that's been done</p>
        </div>
      )}
      <div className="space-y-3">
        {improvements.map((imp, i) => (
          <div key={i} className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Improvement #{i + 1}</span>
              <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1 block">Category</Label>
              <select value={imp.category} onChange={(e) => update(i, "category", e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20 bg-white">
                <option value="">Select category</option>
                {IMPROVEMENT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold text-gray-600 mb-1 block">Year completed</Label>
                <select value={imp.completedYear ?? ""} onChange={(e) => update(i, "completedYear", Number(e.target.value))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20 bg-white">
                  <option value="">Select year</option>
                  {Array.from({ length: 6 }, (_, k) => new Date().getFullYear() - k).map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer" onClick={() => update(i, "hasWarranty", !imp.hasWarranty)}>
                  <input type="checkbox" checked={imp.hasWarranty} readOnly className="w-4 h-4 accent-[#0A1628]" />
                  <span className="text-xs text-gray-600 font-medium">Has warranty</span>
                </label>
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1 block">Notes (optional)</Label>
              <Input placeholder="Contractor name, brand, scope of work..." value={imp.notes}
                onChange={(e) => update(i, "notes", e.target.value)} className="text-sm" />
            </div>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" onClick={add}
        className="w-full flex items-center gap-2 border-dashed border-gray-300 text-gray-600 hover:border-[#0A1628] hover:text-[#0A1628]">
        <Plus className="w-4 h-4" /> Add an improvement
      </Button>
    </div>
  );
}

// ─── Step 5: Wish List ────────────────────────────────────────────────────────
function Step5({ data, setData }: { data: any; setData: (d: any) => void }) {
  const wishes: Array<{ category: string; budgetRange: string; urgency: string; notes: string }> = data.wishes ?? [];
  const add = () => setData({ ...data, wishes: [...wishes, { category: "", budgetRange: "not_sure", urgency: "just_researching", notes: "" }] });
  const remove = (i: number) => setData({ ...data, wishes: wishes.filter((_, idx) => idx !== i) });
  const update = (i: number, field: string, value: any) => setData({ ...data, wishes: wishes.map((w, idx) => idx === i ? { ...w, [field]: value } : w) });

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-2">
        <Star className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">Your wish list helps us match you with the right pros before you even ask. Add anything you're thinking about — no commitment required.</p>
      </div>
      {wishes.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Heart className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No projects added yet</p>
          <p className="text-xs mt-1">What's on your home improvement radar?</p>
        </div>
      )}
      <div className="space-y-3">
        {wishes.map((wish, i) => (
          <div key={i} className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Project #{i + 1}</span>
              <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1 block">Project type</Label>
              <select value={wish.category} onChange={(e) => update(i, "category", e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20 bg-white">
                <option value="">Select project</option>
                {WISH_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-2 block">
                <DollarSign className="w-3 h-3 inline" /> Budget range
              </Label>
              <div className="flex flex-wrap gap-1.5">
                {BUDGET_RANGES.map((b) => (
                  <button key={b.value} type="button" onClick={() => update(i, "budgetRange", b.value)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all ${
                      wish.budgetRange === b.value ? "bg-[#0A1628] text-white border-[#0A1628]" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
                    }`}>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-2 block">
                <Clock className="w-3 h-3 inline" /> Timeline
              </Label>
              <div className="flex flex-wrap gap-1.5">
                {URGENCY_OPTIONS.map((u) => (
                  <button key={u.value} type="button" onClick={() => update(i, "urgency", u.value)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all ${
                      wish.urgency === u.value ? "text-white border-transparent" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
                    }`}
                    style={wish.urgency === u.value ? { backgroundColor: u.color, borderColor: u.color } : {}}>
                    {u.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1 block">Notes (optional)</Label>
              <Input placeholder="Specific requirements, style preferences, questions..." value={wish.notes}
                onChange={(e) => update(i, "notes", e.target.value)} className="text-sm" />
            </div>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" onClick={add}
        className="w-full flex items-center gap-2 border-dashed border-gray-300 text-gray-600 hover:border-[#0A1628] hover:text-[#0A1628]">
        <Plus className="w-4 h-4" /> Add a project
      </Button>
    </div>
  );
}

// ─── Step 6: Interior & Style ────────────────────────────────────────────────
function Step6({ data, setData }: { data: any; setData: (d: any) => void }) {
  const prefs = data.stylePreferences ?? {};
  const set = (key: string, val: string) => setData({ ...data, stylePreferences: { ...prefs, [key]: val } });
  const flooringTypes: string[] = data.flooringTypes ?? [];
  const toggleFlooring = (f: string) => {
    const next = flooringTypes.includes(f) ? flooringTypes.filter(x => x !== f) : [...flooringTypes, f];
    setData({ ...data, flooringTypes: next });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">Interior details help us match the right pros and generate accurate AI before/after mockups of your home.</p>

      {/* Flooring */}
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">Flooring types in your home (select all that apply)</Label>
        <div className="flex flex-wrap gap-2">
          {FLOORING_TYPES.map((f) => (
            <button key={f} type="button" onClick={() => toggleFlooring(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                flooringTypes.includes(f) ? "bg-[#0A1628] text-white border-[#0A1628]" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
              }`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Kitchen countertop */}
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">Kitchen countertop material</Label>
        <div className="flex flex-wrap gap-2">
          {["Granite","Quartz","Marble","Laminate","Butcher Block","Concrete","Tile","Other"].map((c) => (
            <button key={c} type="button" onClick={() => setData({ ...data, kitchenCountertop: c.toLowerCase().replace(" ","_") })}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                data.kitchenCountertop === c.toLowerCase().replace(" ","_") ? "bg-[#0A1628] text-white border-[#0A1628]" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
              }`}>{c}</button>
          ))}
        </div>
      </div>

      {/* Primary bath */}
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">Primary bathroom type</Label>
        <div className="flex flex-wrap gap-2">
          {[
            {v:"walk_in_shower",l:"Walk-In Shower"},
            {v:"tub_shower_combo",l:"Tub/Shower Combo"},
            {v:"soaking_tub",l:"Soaking Tub"},
            {v:"double_vanity",l:"Double Vanity"},
            {v:"single_vanity",l:"Single Vanity"},
          ].map((b) => (
            <button key={b.v} type="button" onClick={() => setData({ ...data, primaryBathType: b.v })}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                data.primaryBathType === b.v ? "bg-[#0A1628] text-white border-[#0A1628]" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
              }`}>{b.l}</button>
          ))}
        </div>
      </div>

      {/* Fireplace */}
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">
          <Flame className="w-3.5 h-3.5 inline mr-1" />Fireplace
        </Label>
        <div className="flex gap-2 flex-wrap">
          {[{v:"none",l:"None"},{v:"gas",l:"Gas"},{v:"wood_burning",l:"Wood Burning"},{v:"electric",l:"Electric"}].map((f) => (
            <button key={f.v} type="button" onClick={() => setData({ ...data, fireplaceType: f.v, fireplaceCount: f.v === "none" ? 0 : (data.fireplaceCount || 1) })}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                data.fireplaceType === f.v ? "bg-[#0A1628] text-white border-[#0A1628]" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
              }`}>{f.l}</button>
          ))}
        </div>
        {data.fireplaceType && data.fireplaceType !== "none" && (
          <div className="mt-2 flex items-center gap-3">
            <Label className="text-xs text-gray-600">How many?</Label>
            <div className="flex gap-2">
              {[1,2,3].map(n => (
                <button key={n} type="button" onClick={() => setData({ ...data, fireplaceCount: n })}
                  className={`w-9 h-9 rounded-lg border text-sm font-bold transition-all ${
                    data.fireplaceCount === n ? "border-[#0A1628] bg-[#0A1628] text-white" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
                  }`}>{n}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ceiling height */}
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">Ceiling height</Label>
        <div className="flex flex-wrap gap-2">
          {[
            {v:"standard_8ft",l:"8 ft (Standard)"},
            {v:"9ft",l:"9 ft"},
            {v:"10ft",l:"10 ft"},
            {v:"vaulted",l:"Vaulted"},
            {v:"cathedral",l:"Cathedral"},
            {v:"mixed",l:"Mixed"},
          ].map((c) => (
            <button key={c.v} type="button" onClick={() => setData({ ...data, ceilingHeight: c.v })}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                data.ceilingHeight === c.v ? "bg-[#0A1628] text-white border-[#0A1628]" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
              }`}>{c.l}</button>
          ))}
        </div>
      </div>

      {/* Window type */}
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">Window type</Label>
        <div className="flex flex-wrap gap-2">
          {[
            {v:"single_pane",l:"Single Pane (older)"},
            {v:"double_pane",l:"Double Pane"},
            {v:"triple_pane",l:"Triple Pane"},
            {v:"impact_resistant",l:"Impact Resistant"},
            {v:"unknown",l:"Not Sure"},
          ].map((w) => (
            <button key={w.v} type="button" onClick={() => setData({ ...data, windowType: w.v })}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                data.windowType === w.v ? "bg-[#0A1628] text-white border-[#0A1628]" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
              }`}>{w.l}</button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Visual Style & Aesthetic</p>
      </div>

      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Home architectural style</Label>
        <div className="flex flex-wrap gap-2">
          {HOME_STYLES.map((s) => <Chip key={s} label={s} active={prefs.homeStyle === s} onClick={() => set("homeStyle", s)} />)}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Current exterior color palette</Label>
        <div className="flex flex-wrap gap-2">
          {EXTERIOR_COLORS.map((c) => <Chip key={c} label={c} active={prefs.exteriorColor === c} onClick={() => set("exteriorColor", c)} color="#0891b2" />)}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Interior color palette</Label>
        <div className="space-y-2">
          {INTERIOR_PALETTES.map((p) => (
            <button key={p} type="button" onClick={() => set("interiorPalette", p)}
              className={`w-full text-left px-4 py-2.5 rounded-xl border-2 text-sm transition-all ${
                prefs.interiorPalette === p ? "border-[#0A1628] bg-[#0A1628]/5 text-[#0A1628] font-semibold" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
              }`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Overall design aesthetic</Label>
        <div className="flex flex-wrap gap-2">
          {DESIGN_AESTHETICS.map((a) => <Chip key={a} label={a} active={prefs.designAesthetic === a} onClick={() => set("designAesthetic", a)} color="#7C3AED" />)}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">Additional style notes (optional)</Label>
        <Textarea placeholder="Describe your dream home, inspiration, or anything specific about your style..."
          value={prefs.styleNotes ?? ""} onChange={(e) => set("styleNotes", e.target.value)} className="text-sm resize-none" rows={3} />
      </div>
    </div>
  );
}

// --- Step 7: Property Photos ---
const PHOTO_EXAMPLE_URL = "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/photo-example-good-2xpeBBGXksWdwvxoGE2D3u.webp";

function Step7({ data, setData, propertyId }: { data: any; setData: (d: any) => void; propertyId: number | null }) {
  // uploadedPhotos: Record<roomId, string[]> -- multiple photos per room
  const uploadedPhotos: Record<string, string[]> = data.uploadedPhotos ?? {};
  const [uploadingRoom, setUploadingRoom] = useState<string | null>(null);
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null);
  const [showTips, setShowTips] = useState(false);

  const uploadPhoto = trpc.homeowner.uploadPropertyPhoto.useMutation({
    onSuccess: (res, vars) => {
      const roomId = vars.roomLabel.replace(/_\d+$/, "");
      const existing = uploadedPhotos[roomId] ?? [];
      setData({ ...data, uploadedPhotos: { ...uploadedPhotos, [roomId]: [...existing, res.url] } });
      setUploadingRoom(null);
      toast.success("Photo uploaded!");
    },
    onError: (e) => {
      setUploadingRoom(null);
      toast.error("Upload failed: " + e.message);
    },
  });

  const handleFile = (roomId: string, file: File) => {
    if (!propertyId) {
      toast.error("Save property basics first (go back to step 1).");
      return;
    }
    setUploadingRoom(roomId);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      const existingCount = (uploadedPhotos[roomId] ?? []).length;
      uploadPhoto.mutate({ propertyId, roomLabel: `${roomId}_${existingCount + 1}`, photoBase64: base64, mimeType: file.type });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (roomId: string, idx: number) => {
    const updated = (uploadedPhotos[roomId] ?? []).filter((_, i) => i !== idx);
    setData({ ...data, uploadedPhotos: { ...uploadedPhotos, [roomId]: updated } });
  };

  const totalPhotos = Object.values(uploadedPhotos).reduce((sum, arr) => sum + arr.length, 0);
  const roomsWithPhotos = Object.keys(uploadedPhotos).filter(k => (uploadedPhotos[k] ?? []).length > 0).length;

  return (
    <div className="space-y-4">
      {/* Photo Tips Banner */}
      <div className="p-3 rounded-xl bg-teal-50 border border-teal-100">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <Camera className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-teal-700">
              Photos are the most valuable data point in your home profile. Our AI uses them to detect issues, generate before/after mockups, and match you with the right pros.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className="text-[10px] font-semibold text-teal-700 underline whitespace-nowrap flex-shrink-0"
          >
            {showTips ? "Hide tips" : "Photo tips"}
          </button>
        </div>
        {showTips && (
          <div className="mt-3 pt-3 border-t border-teal-200 space-y-3">
            <p className="text-xs font-semibold text-teal-800">How to take a great home photo</p>
            <img
              src={PHOTO_EXAMPLE_URL}
              alt="Example of a quality home photo"
              className="w-full rounded-lg object-cover"
              style={{ maxHeight: 180 }}
            />
            <p className="text-[10px] text-teal-700 italic">Example: Wide-angle corner shot, natural light, full room visible from floor to ceiling</p>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { icon: "📐", tip: "Shoot from a corner — capture the full room, not just one wall" },
                { icon: "☀️", tip: "Use natural light — open blinds and turn on all lights" },
                { icon: "📱", tip: "Hold your phone horizontally (landscape) for wider coverage" },
                { icon: "🎯", tip: "Keep the phone level — avoid tilted or angled shots" },
                { icon: "🚫", tip: "Remove clutter, pets, and people from the frame" },
                { icon: "🔍", tip: "Take close-ups of damage, wear, or special features separately" },
              ].map(({ icon, tip }) => (
                <div key={tip} className="flex items-start gap-1.5">
                  <span className="text-sm flex-shrink-0">{icon}</span>
                  <p className="text-[10px] text-teal-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Room Cards */}
      <div className="space-y-2">
        {PHOTO_ROOMS.map((room) => {
          const photos = uploadedPhotos[room.id] ?? [];
          const isUploading = uploadingRoom === room.id;
          const isExpanded = expandedRoom === room.id;

          return (
            <div key={room.id} className={`rounded-xl border-2 overflow-hidden transition-all ${photos.length > 0 ? "border-teal-400" : "border-gray-200"}`}>
              <button
                type="button"
                className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedRoom(isExpanded ? null : room.id)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{room.icon}</span>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-gray-800">{room.label}</p>
                    <p className="text-[9px] text-gray-400">{room.tip}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {photos.length > 0 && (
                    <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {photos.length} photo{photos.length !== 1 ? "s" : ""}
                    </span>
                  )}
                  <span className="text-gray-400 text-xs">{isExpanded ? "▲" : "▼"}</span>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100 p-3 bg-gray-50 space-y-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <p className="text-[10px] font-semibold text-blue-700 mb-1">📸 Suggested shots:</p>
                    <ul className="space-y-0.5">
                      {room.shots.map((shot: string, i: number) => (
                        <li key={i} className="text-[9px] text-blue-600 flex items-start gap-1">
                          <span className="font-bold">{i + 1}.</span> {shot}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[9px] text-blue-500 mt-1.5 italic">{room.guidance}</p>
                  </div>

                  {photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {photos.map((url: string, idx: number) => (
                        <div key={idx} className="relative rounded-lg overflow-hidden">
                          <img src={url} alt={`${room.label} ${idx + 1}`} className="w-full h-20 object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(room.id, idx)}
                            className="absolute top-1 right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-[9px] font-bold hover:bg-red-600"
                          >
                            x
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[8px] text-center py-0.5">
                            Photo {idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {isUploading ? (
                    <div className="flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-dashed border-teal-300 bg-teal-50">
                      <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs text-teal-600">Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files) Array.from(e.target.files).forEach(file => handleFile(room.id, file));
                          }}
                        />
                        <div className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-teal-600 text-white text-xs font-bold active:scale-95 transition-all">
                          <Camera className="w-3.5 h-3.5" /> Take Photo
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files) Array.from(e.target.files).forEach(file => handleFile(room.id, file));
                          }}
                        />
                        <div className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-600 text-xs font-semibold active:scale-95 transition-all">
                          <Upload className="w-3.5 h-3.5" /> Library
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center space-y-1">
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-teal-600">{totalPhotos} photo{totalPhotos !== 1 ? "s" : ""}</span> uploaded across{" "}
          <span className="font-semibold text-teal-600">{roomsWithPhotos}</span> of {PHOTO_ROOMS.length} rooms
        </p>
        {totalPhotos === 0 && (
          <p className="text-[10px] text-gray-400">Photos are optional but significantly improve your AI analysis</p>
        )}
        {totalPhotos >= 5 && totalPhotos < 15 && (
          <p className="text-[10px] text-teal-500">Good start! More photos = better AI insights</p>
        )}
        {totalPhotos >= 15 && (
          <p className="text-[10px] text-teal-600 font-semibold">Excellent coverage — your AI analysis will be highly accurate</p>
        )}
      </div>
    </div>
  );
}
// ─── Step 8: Consent & Finish ─────────────────────────────────────────────────
function Step8({ data, setData }: { data: any; setData: (d: any) => void }) {
  const consents = data.consents ?? {};
  const set = (key: string, val: boolean) => setData({ ...data, consents: { ...consents, [key]: val } });

  const CONSENT_ITEMS = [
    { key: "consentTerms",          required: true,  title: "Terms of Service & Privacy Policy",    desc: "I agree to TrustyPro's Terms of Service and Privacy Policy.",                                                                                                                   icon: Lock },
    { key: "consentPhotos",         required: false, title: "AI Photo Analysis",                    desc: "I consent to TrustyPro using my property photos to detect maintenance needs and generate improvement mockups.",                                                                 icon: Camera },
    { key: "consentPartnerContact", required: false, title: "Partner Contact",                      desc: "I consent to being contacted by vetted ProLnk partners about services relevant to my home.",                                                                                    icon: Eye },
    { key: "consentAiData",         required: false, title: "AI Training & Market Intelligence",    desc: "I consent to anonymized use of my property data to improve AI models and generate market insights. This data is never sold with personally identifiable information.",          icon: Sparkles },
  ];

  return (
    <div className="space-y-5">
      <div className="text-center py-2">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Almost done!</h3>
        <p className="text-sm text-gray-500">Add your contact info and review your consent preferences.</p>
      </div>

      {/* Contact info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <div>
          <Label className="text-xs font-semibold text-gray-600 mb-1 block">Display Name</Label>
          <Input
            placeholder="Jane Smith"
            value={data.displayName ?? ""}
            onChange={(e) => setData({ ...data, displayName: e.target.value })}
            className="text-sm"
          />
        </div>
        <div>
          <Label className="text-xs font-semibold text-gray-600 mb-1 block">Phone Number</Label>
          <Input
            type="tel"
            placeholder="(214) 555-0100"
            value={data.phone ?? ""}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className="text-sm"
          />
        </div>
      </div>

      <div className="space-y-3">
        {CONSENT_ITEMS.map((item) => {
          const Icon = item.icon;
          const checked = !!consents[item.key];
          return (
            <div key={item.key} onClick={() => set(item.key, !checked)}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                checked ? "border-[#0A1628] bg-[#0A1628]/3" : "border-gray-200 hover:border-gray-300 bg-white"
              }`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${checked ? "bg-[#0A1628]" : "bg-gray-100"}`}>
                <Icon className={`w-4 h-4 ${checked ? "text-white" : "text-gray-500"}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  {item.required && <span className="text-[9px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Required</span>}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${checked ? "bg-[#0A1628] border-[#0A1628]" : "border-gray-300"}`}>
                {checked && <CheckCircle className="w-3 h-3 text-white" />}
              </div>
            </div>
          );
        })}
      </div>

      {!consents.consentTerms && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-600">Please accept the required Terms of Service to continue.</p>
        </div>
      )}

      <div className="p-4 rounded-xl bg-gradient-to-r from-[#0A1628] to-[#0891b2] text-white">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-bold">What happens next</span>
        </div>
        <ul className="space-y-1.5 text-xs text-white/80">
          <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 flex-shrink-0" /> Your home profile is activated in the ProLnk network</li>
          <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 flex-shrink-0" /> AI scans your property data for maintenance opportunities</li>
          <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 flex-shrink-0" /> Vetted pros in your area are matched to your wish list</li>
          <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 flex-shrink-0" /> You receive curated offers — no spam, no cold calls</li>
        </ul>
      </div>
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────
export default function HomeSetupWizard() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Record<string, any>>({});
  const [propertyId, setPropertyId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const saveProperty = trpc.homeowner.saveProperty.useMutation();
  const saveImprovements = trpc.homeowner.saveImprovements.useMutation();
  const saveWishes = trpc.homeowner.saveWishes.useMutation();
  const saveProfile = trpc.homeowner.saveProfile.useMutation();

  const canProceed = () => {
    if (step === 1) return !!(data.propertyType && data.address);
    if (step === 2) return !!(data.ownershipYears && data.occupancy);
    if (step === 3) return (data.systems?.length ?? 0) > 0;
    if (step === 8) return !!(data.consents?.consentTerms);
    return true;
  };

  const handleNext = async () => {
    // Auto-save systems after step 3
    if (step === 3 && propertyId) {
      setSaving(true);
      try {
        await saveProperty.mutateAsync({
          id: propertyId,
          address: data.address ?? "",
          homeSystems: data.systems ?? [],
          systemAges: data.systemAges ?? {},
          setupStep: 4,
        });
      } catch (e: any) {
        toast.error("Could not save systems: " + e.message);
        setSaving(false);
        return;
      }
      setSaving(false);
    }
    // Auto-save property basics after step 1 (creates the property record)
    if (step === 1) {
      setSaving(true);
      try {
        const result = await saveProperty.mutateAsync({
          id: propertyId ?? undefined,
          address: data.address ?? "",
          city: data.city,
          state: data.state,
          zip: data.zip,
          propertyType: data.propertyType,
          yearBuilt: data.yearBuilt,
          sqft: data.sqft,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          lotSize: data.lotSize,
          hasPool: data.hasPool ?? false,
          hasGarage: data.hasGarage ?? false,
          garageType: data.garageType ?? "none",
          hasFence: data.hasFence ?? false,
          nickname: data.nickname,
          setupStep: 2,
        });
        setPropertyId(result.id);
      } catch (e: any) {
        toast.error("Could not save property: " + e.message);
        setSaving(false);
        return;
      }
      setSaving(false);
    }
    setStep((s) => s + 1);
  };

  const handleFinish = async () => {
    if (!canProceed()) return;
    setSaving(true);
    try {
      const pid = propertyId;
      if (!pid) throw new Error("Property not saved — please go back to step 1.");

      // Save ownership context + systems + style prefs to property
      await saveProperty.mutateAsync({
        id: pid,
        address: data.address ?? "",
        ownershipYears: data.ownershipYears,
        occupancy: data.occupancy,
        isRental: data.isRental ?? false,
        homeSystems: data.systems ?? [],
        systemAges: data.systemAges ?? {},
        hiringPriorities: data.hiringPriorities ?? [],
        stylePreferences: data.stylePreferences ?? {},
        setupStep: 8,
        setupComplete: true,
      });

      // Save improvements
      const validImprovements = (data.improvements ?? []).filter((i: any) => i.category);
      if (validImprovements.length > 0) {
        await saveImprovements.mutateAsync({ propertyId: pid, improvements: validImprovements });
      }

      // Save wishes
      const validWishes = (data.wishes ?? []).filter((w: any) => w.category);
      if (validWishes.length > 0) {
        await saveWishes.mutateAsync({ propertyId: pid, wishes: validWishes });
      }

      // Save consent flags + contact info to homeowner profile
      await saveProfile.mutateAsync({
        displayName: data.displayName || undefined,
        phone: data.phone || undefined,
        consentTerms: data.consents?.consentTerms ?? false,
        consentPhotos: data.consents?.consentPhotos ?? false,
        consentPartnerContact: data.consents?.consentPartnerContact ?? false,
        consentAiData: data.consents?.consentAiData ?? false,
        setupComplete: true,
      });

      toast.success("Your home profile is live! Welcome to TrustyPro.");
      navigate("/my-home");
    } catch (e: any) {
      toast.error("Could not save profile: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const S = STEPS[step - 1];
  const Icon = S.icon;

  return (
    <HomeownerLayout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex items-start justify-center p-4 py-8">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#0A1628] flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-black text-gray-900">TrustyPro</span>
          </div>
          <p className="text-xs text-gray-400">Home Profile Setup</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <ProgressBar step={step} total={STEPS.length} />

          {/* Step header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#0A1628]/8 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-[#0A1628]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">{S.title}</h2>
              <p className="text-xs text-gray-400">{S.desc}</p>
            </div>
          </div>

          {/* Step content */}
          {step === 1 && <Step1 data={data} setData={setData} />}
          {step === 2 && <Step2 data={data} setData={setData} />}
          {step === 3 && <Step3 data={data} setData={setData} />}
          {step === 4 && <Step4 data={data} setData={setData} />}
          {step === 5 && <Step5 data={data} setData={setData} />}
          {step === 6 && <Step6 data={data} setData={setData} />}
          {step === 7 && <Step7 data={data} setData={setData} propertyId={propertyId} />}
          {step === 8 && <Step8 data={data} setData={setData} />}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button type="button" onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {step < STEPS.length ? (
              <Button onClick={handleNext} disabled={!canProceed() || saving}
                className="flex items-center gap-2 px-6" style={{ backgroundColor: "#0A1628" }}>
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Continue <ChevronRight className="w-4 h-4" /></>
                )}
              </Button>
            ) : (
              <Button onClick={handleFinish} disabled={!canProceed() || saving}
                className="flex items-center gap-2 px-6" style={{ backgroundColor: "#059669" }}>
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Activate My Profile <CheckCircle className="w-4 h-4" /></>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Skip */}
        {step < STEPS.length && (
          <div className="text-center mt-4">
            <button type="button" onClick={() => navigate("/my-home")}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Skip setup for now — complete later from your dashboard
            </button>
          </div>
        )}
      </div>
    </div>
    </HomeownerLayout>
  );
}
